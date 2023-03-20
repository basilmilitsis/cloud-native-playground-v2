import { Environment } from '../Environment'

import { GluegunFilesystem } from 'gluegun'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Pool } from 'pg'
import { from } from 'pg-copy-streams'
import { NamingStrategyInterface } from 'typeorm'
import * as path from 'path'

export class DbDataManager {
  schemaName: string
  pool: Pool
  namingStrategy: NamingStrategyInterface
  messageCallback: (message: string) => void

  constructor(schemaName: string, messageCallback: (message: string) => void) {
    this.schemaName = schemaName
    this.namingStrategy = new SnakeNamingStrategy()
    this.messageCallback = messageCallback
    this.pool = new Pool({
      host: Environment.DB_HOST,
      port: Environment.DB_PORT,
      user: Environment.DB_USER,
      password: Environment.DB_PASSWORD,
      database: Environment.DB_NAME
    })
  }

  async syncData(
    dbModelsDataFolderPath: string,
    filesystem: GluegunFilesystem
  ) {
    //-- CSV
    const fileNames = filesystem.list(dbModelsDataFolderPath)
    const csvFileNames = fileNames.filter((value): boolean => {
      return value.endsWith('.csv')
    })

    //-- Tables to load
    const tablesToLoad: { tableName: string; fileName: string }[] = []
    for (const csvFile of csvFileNames) {
      const tableName = this.namingStrategy.tableName(
        csvFile.replace(/\.csv/, '').replace(/\d*\./, ''),
        ''
      )
      tablesToLoad.push({ tableName: tableName, fileName: csvFile })
    }

    //-- Truncate tables
    for (const table of tablesToLoad) {
      // Create client
      const client = await this.pool.connect()

      // Truncate table
      await client.query(
        `TRUNCATE TABLE ${this.schemaName}.${
          table.tableName
        } CASCADE;SET datestyle='ISO,YMD';SET timezone='Africa/Harare'`
      )
      this.messageCallback(`truncated table: ${table.tableName}`)

      // Release client
      client.release()
    }

    //-- Load CSV data into Tables
    for (const table of tablesToLoad) {
      console.log('==> LOADING:', table.tableName)

      // try find a csv to be loaded that matches
      const csvFile = tablesToLoad.find(
        data => data.tableName === table.tableName
      )
      if (!csvFile) {
        continue
      }

      // Crate client
      const client = await this.pool.connect()

      // Stream to DB Table
      await new Promise((resolve, reject) => {
        const dbStream = client.query(
          from(
            `COPY ${this.schemaName}.${
              table.tableName
            } FROM STDIN WITH DELIMITER ',' CSV HEADER`
          )
        )
        dbStream.on('error', reject)
        dbStream.on('finish', resolve)

        const fileStream = filesystem.createReadStream(
          path.join(dbModelsDataFolderPath, csvFile.fileName)
        )
        fileStream.on('error', reject)

        fileStream.pipe(dbStream)
      })

      // Release client
      client.release()
    }

    await this.pool.end()
  }
}

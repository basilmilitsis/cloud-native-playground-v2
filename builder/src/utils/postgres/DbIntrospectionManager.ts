import { Environment } from '../Environment'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Pool } from 'pg'
import { NamingStrategyInterface } from 'typeorm'
import { postgraphile } from 'postgraphile'

export class DbIntrospectionManager {
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

  async introspectAndWrite(schemaName: string, dbModelsDataFolderPath: string) {
    await postgraphile(
      `postgres://${Environment.DB_USER}:${Environment.DB_PASSWORD}@${
        Environment.DB_HOST
      }:${Environment.DB_PORT}/${Environment.DB_NAME}`,
      schemaName,
      {
        exportGqlSchemaPath: dbModelsDataFolderPath,
        sortExport: true
      }
    )

    this.messageCallback(`introspected schema: ${schemaName}`)
    this.messageCallback(`wrote schema to: ${dbModelsDataFolderPath}`)
  }
}

//import { Environment } from '../../../utils/Environment'

import { GluegunToolbox, filesystem } from 'gluegun'

import { PackageJsonUtils } from '../../../utils/PackageJsonUtils'
import { DbModelManager } from '../../../utils/postgres/DbModelManager'
import { DbDataManager } from '../../../utils/postgres/DbDataManager'
import { determineSchemaName } from '../../../utils/helpers/determineSchemaName'

module.exports = {
  name: 'init-db',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info }
    } = toolbox

    let schemaName = PackageJsonUtils.readPackageName('./')
    schemaName = determineSchemaName(schemaName)

    if (!schemaName) {
      throw new Error('No package.json file found')
    }
    // console.log(
    //   '===========> SHARED_POSTGRES_DB_NAMES',
    //   process.env.SHARED_POSTGRES_DB_NAMES
    // )
    // if (!Environment.DB_NAMES.includes(dbName)) {
    //   throw new Error(`Invalid DB name supplied: ${dbName}`)
    // }

    // Sync models
    const dbModelManager = new DbModelManager()
    await dbModelManager.syncModels(schemaName, '.build/init_db/')
    info(`Synced Models...`)

    // Sync data
    const dbDataManager = new DbDataManager(schemaName, message =>
      info(message)
    )
    await dbDataManager.syncData('./src/initDb/data', filesystem)
    info(`Synced Data...`)
  }
}

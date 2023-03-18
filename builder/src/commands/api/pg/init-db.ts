import { Environment } from '../../../utils/Environment'

import { GluegunToolbox, filesystem } from 'gluegun'

import { PackageJsonUtils } from '../../../utils/PackageJsonUtils'
import { DbModelManager } from '../../../utils/postgres/DbModelManager'
import { DbDataManager } from '../../../utils/postgres/DbDataManager'

module.exports = {
  name: 'init-db',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info }
    } = toolbox

    const dbName = PackageJsonUtils.readPackageName('./')

    if (!dbName) {
      throw new Error('No package.json file found')
    }

    if (!Environment.DB_NAMES.includes(dbName)) {
      throw new Error(`Invalid DB name supplied: ${dbName}`)
    }

    // Sync models
    const dbModelManager = new DbModelManager()
    await dbModelManager.syncModels(dbName, '.build_init_db/')
    info(`Synced Models...`)

    // Sync data
    const dbDataManager = new DbDataManager(dbName, message => info(message))
    await dbDataManager.syncData('./src/initDb/data', filesystem)
    info(`Synced Data...`)
  }
}

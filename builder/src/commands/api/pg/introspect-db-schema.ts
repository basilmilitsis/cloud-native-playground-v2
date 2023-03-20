import { GluegunToolbox } from 'gluegun'

import { PackageJsonUtils } from '../../../utils/PackageJsonUtils'
import { determineSchemaName } from '../../../utils/helpers/determineSchemaName'
import { DbIntrospectionManager } from '../../../utils/postgres/DbIntrospectionManager'

module.exports = {
  name: 'introspect-db-schema',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info }
    } = toolbox

    let schemaName = PackageJsonUtils.readPackageName('./')
    schemaName = determineSchemaName(schemaName)

    if (!schemaName) {
      throw new Error('No package.json file found')
    }

    // Introspect PG
    const dbIntrospectionManager = new DbIntrospectionManager(
      schemaName,
      message => info(message)
    )
    await dbIntrospectionManager.introspectAndWrite(
      schemaName,
      './src/db/.generated/schema/db.graphql'
    )
    info(`Introspection Complete...`)
  }
}

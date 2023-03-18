import { GluegunToolbox, filesystem } from 'gluegun'
import * as path from 'path'

import {
  TemplateModel,
  ResolversInfo
} from '../../../templates/api/pg/generateApiQueryBuilder/TemplateModel'
import { writeTemplateSingle } from '../../../utils/writeTemplate'
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths'

module.exports = {
  name: 'generate-api-builder',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      print: { info }
    } = toolbox

    const resolversInfo: ResolversInfo = [
      ...buildResolverInfoForFolder(ApiPgPaths.abs_api_queries, 'queries'),
      ...buildResolverInfoForFolder(ApiPgPaths.abs_api_commands, 'commands')
    ]

    // Write the Query Builder
    const templateModel: TemplateModel = {
      localTemplatePath: TemplateModel.templatePath('buildSchema.ts.ejs'),
      relativeOutputPath: ApiPgPaths.abs_api_generated_buildSchema(
        'buildSchema.ts'
      ),
      resolvers: resolversInfo
    }
    await writeTemplateSingle(templateModel, generate, toolbox.print)
    info(`Updated Query Builder`)
  }
}

const buildResolverInfoForFolder = (
  pathBuilder: (append?: string) => string,
  operationType: 'queries' | 'commands'
): ResolversInfo => {
  const directoryContents: string[] = filesystem.list(pathBuilder())
  const resolversInfo: ResolversInfo = []

  // Find all resolvers
  directoryContents.forEach(async itemName => {
    if (itemName === '.generated') {
      return
    }

    const fullItemPath = pathBuilder(itemName)
    if (!filesystem.isDirectory(fullItemPath)) {
      return
    }

    const indexFileFullPath = path.join(fullItemPath, 'index.ts')
    const indexFileContent = filesystem.read(indexFileFullPath)
    const classNameMatch = indexFileContent.match(/class (.*)\{/m)
    if (!classNameMatch || classNameMatch.length < 2) {
      throw new Error('Error parsing resolver file')
    }

    const className = classNameMatch[1].trimRight()
    resolversInfo.push({
      name: className,
      operationType: operationType,
      folderName: itemName
    })
  })

  return resolversInfo
}

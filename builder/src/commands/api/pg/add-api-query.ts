import { GluegunToolbox, strings, system } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/addApiQuery/TemplateModel'

import { writeTemplateRecursively } from '../../../utils/writeTemplate'
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths'

module.exports = {
  name: 'add-api-query',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      filesystem,
      template: { generate },
      print: { info }
    } = toolbox

    const queryName = parameters.first

    if (!queryName) {
      throw new Error('Please supply a name')
    }

    const directoryContents: string[] = filesystem.list(
      ApiPgPaths.abs_api_queries()
    )

    // Ensure resolver does not exist
    if (
      directoryContents
        .map(x => x.toLowerCase())
        .includes(queryName.toLowerCase())
    ) {
      throw new Error('Query already exists')
    }

    // Write resolver template
    const queryName_upperFirst = strings.upperFirst(queryName)
    const queryName_lowerFirst = strings.lowerFirst(queryName)
    const templateModel: TemplateModel = {
      localTemplatePath: TemplateModel.templatePath(),
      relativeOutputPath: ApiPgPaths.abs_api_queries(queryName_lowerFirst),
      templateFileName: queryName_upperFirst,

      operationName: queryName_lowerFirst,
      operationResolverName: `${queryName_upperFirst}Resolver`,
      operationInputName: `${queryName_upperFirst}Input`,
      operationOutputName: `${queryName_upperFirst}Output`
    }
    await writeTemplateRecursively(templateModel, generate, toolbox.print)
    info(`query added`)

    // Update the Query Builder
    await system.run(`builder api pg generate-api-builder`)
  }
}

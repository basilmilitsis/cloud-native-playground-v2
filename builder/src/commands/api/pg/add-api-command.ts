import { GluegunToolbox, strings, system } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/addApiQuery/TemplateModel'

import { writeTemplateRecursively } from '../../../utils/writeTemplate'
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths'

module.exports = {
  name: 'add-api-command',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      filesystem,
      template: { generate },
      print: { info }
    } = toolbox

    const commandName = parameters.first

    if (!commandName) {
      throw new Error('Please supply a name')
    }

    const directoryContents: string[] = filesystem.list(
      ApiPgPaths.abs_api_commands()
    )

    // Ensure resolver does not exist
    if (
      directoryContents
        .map(x => x.toLowerCase())
        .includes(commandName.toLowerCase())
    ) {
      throw new Error('Command already exists')
    }

    // Write resolver template
    const commandName_upperFirst = strings.upperFirst(commandName)
    const commandName_lowerFirst = strings.lowerFirst(commandName)
    const templateModel: TemplateModel = {
      localTemplatePath: TemplateModel.templatePath(),
      relativeOutputPath: ApiPgPaths.abs_api_commands(commandName_lowerFirst),
      templateFileName: commandName_upperFirst,

      operationName: commandName_lowerFirst,
      operationResolverName: `${commandName_upperFirst}Resolver`,
      operationInputName: `${commandName_upperFirst}Input`,
      operationOutputName: `${commandName_upperFirst}Output`
    }
    await writeTemplateRecursively(templateModel, generate, toolbox.print)
    info(`command added`)

    // Update the Query Builder
    await system.run(`build api pg generate-api-builder`)
  }
}

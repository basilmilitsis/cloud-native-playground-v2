import { GluegunToolbox, system } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/exampleApiQuery/TemplateModel'
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths'
import { writeTemplateRecursively } from '../../../utils/writeTemplate'

module.exports = {
  name: 'example-api-query',
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      print: { info }
    } = toolbox

    // Write resolver template
    const templateModel: TemplateModel = {
      localTemplatePath: TemplateModel.templatePath(),
      relativeOutputPath: ApiPgPaths.abs_src()
    }
    await writeTemplateRecursively(templateModel, generate, toolbox.print)

    // Update the Query Builder
    await system.run(`build api pg generate-api-builder`)

    info(`Example Added - Api Query`)
  }
}

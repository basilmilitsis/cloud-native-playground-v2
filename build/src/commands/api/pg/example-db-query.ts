import { GluegunToolbox } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/exampleDbQuery/TemplateModel';
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths';
import { writeTemplateRecursively } from '../../../utils/writeTemplate';

module.exports = {
    name: 'example-db-query',
    run: async (toolbox: GluegunToolbox) => {
        const {
            template: { generate },
            print: { info }
        } = toolbox

        // Write resolver template
        const templateModel: TemplateModel = {
            localTemplatePath: TemplateModel.templatePath(),
            relativeOutputPath: ApiPgPaths.abs_src(),
        };
        await writeTemplateRecursively(templateModel, generate, toolbox.print);


       
        info(`Example Added - Db Query`)
    }
}

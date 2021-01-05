import { GluegunToolbox } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/exampleDbInit/TemplateModel';
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths';
import { writeTemplateRecursively } from '../../../utils/writeTemplate';

module.exports = {
    name: 'example-db-init',
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
        
        info(`DB init example Added`)
    }
}

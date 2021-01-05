import { GluegunToolbox, strings } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/generateDbCodeMutations/TemplateModel';
import { writeTemplateSingle } from '../../../utils/writeTemplate';
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths';


module.exports = {
    name: 'generate-db-code-mutations',
    run: async (toolbox: GluegunToolbox) => {
        const {
            filesystem,
            template: { generate },
        } = toolbox

        const directoryContents: string[] = filesystem.list(ApiPgPaths.abs_db_mutations());

        directoryContents.forEach(async fileName => {

            // Ensure file is valid
            if( fileName === '.gitkeep' ) {
                return;
            }

            // Find query to write
            const fileContent = filesystem.read( ApiPgPaths.abs_db_mutations(fileName) );
            const nameMatch = fileContent.match(/mutation (.*)\(/m);
            if( !nameMatch || nameMatch.length < 2 ) {
                throw new Error('Error parsing mutation');
            }

            // Write
            const operationName = nameMatch[1].trimEnd();
            const templateModel: TemplateModel = {
                localTemplatePath: TemplateModel.templatePath('mutation.ts.ejs'),
                relativeOutputPath: ApiPgPaths.abs_db_generatedMutations(`${operationName}Mutation.ts`),

                dbTypeName: strings.upperFirst(operationName) + 'Mutation',
                functionName: operationName + 'Mutation',
                operationName: operationName,
                variablesName: strings.upperFirst(operationName) + 'MutationVariables'
            };
            await writeTemplateSingle(templateModel, generate, toolbox.print);
        });
    }
}
import { GluegunToolbox, strings } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/generateDbCodeQueries/TemplateModel';
import { writeTemplateSingle } from '../../../utils/writeTemplate';
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths';


module.exports = {
    name: 'generate-db-code-queries',
    run: async (toolbox: GluegunToolbox) => {
        const {
            filesystem,
            template: { generate },
        } = toolbox

        const directoryContents: string[] = filesystem.list(ApiPgPaths.abs_db_queries());

        directoryContents.forEach(async fileName => {

            // Ensure file is valid
            if( fileName === '.gitkeep' ) {
                return;
            }

            // Find query to write
            const fileContent = filesystem.read( ApiPgPaths.abs_db_queries(fileName) );
            const nameMatch = fileContent.match(/query (.*)\(/m);
            if( !nameMatch || nameMatch.length < 2 ) {
                throw new Error('Error parsing query');
            }

            // Write
            const operationName = nameMatch[1].trimEnd();
            const templateModel: TemplateModel = {
                localTemplatePath: TemplateModel.templatePath('query.ts.ejs'),
                relativeOutputPath: ApiPgPaths.abs_db_generatedQueries(`${operationName}Query.ts`),

                dbTypeName: strings.upperFirst(operationName) + 'Query',
                functionName: operationName + 'Query',
                operationName: operationName,
                variablesName: strings.upperFirst(operationName) + 'QueryVariables'
            };
            await writeTemplateSingle(templateModel, generate, toolbox.print);
        });
    }
}
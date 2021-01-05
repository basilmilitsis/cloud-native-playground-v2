import { GluegunToolbox, strings } from 'gluegun'

import { TemplateModel } from '../../../templates/api/pg/create/TemplateModel';    

import { writeTemplateRecursively } from '../../../utils/writeTemplate';
import { ApiPgPaths } from '../../../utils/helpers/ApiPgPaths';
import { YamlUtils } from '../../../utils/YamlUtils';

module.exports = {
    name: 'create',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            template: { generate },
            print: { info }
        } = toolbox

        const name = parameters.first;
        const port = Number.parseInt(parameters.second);

        if( !name ) {
            throw new Error('Please supply a name');
        }
        if( !port ) {
            throw new Error('Please supply a port');
        }

        // Write template
        const templateModel: TemplateModel = {
            localTemplatePath: TemplateModel.templatePath(),
            relativeOutputPath: ApiPgPaths.rel_apiRootDirectory(name),

            name: name,
            port: port,
            envDbName: `${strings.upperCase(name)}_DB_NAME`,
            envPortName: `${strings.upperCase(name)}_API_PORT`,
        }

        await writeTemplateRecursively(templateModel, generate, toolbox.print);
        info(`Created new API`)


        // Update 'graphql.config.yml'
        const yaml: VsCodeGraphQlConfig = YamlUtils.readFile('./graphql.config.yml');
        if( !yaml.projects ) {
            yaml.projects = [];
        }
        const serviceConfig = {
            schema: [
                ApiPgPaths.rel_apiSchema(name),
                ApiPgPaths.rel_dbSchema(name),
            ],
            extensions: {
                languageService: {
                    useSchemaFileDefinitions: true
                }            
            }
        };
        yaml.projects.push({ [name]: serviceConfig });
        YamlUtils.writeFile('./graphql.config.yml', yaml);
        info(`Updated graphql.config.yml`)
    }
}

interface VsCodeGraphQlConfig {
    projects: Array<{[key: string]: VsCodeGraphQlConfigProject}>
}
interface VsCodeGraphQlConfigProject {
    schema: Array<string>,
    extensions: {
        languageService: {
            useSchemaFileDefinitions: boolean
        }
    }
}
import * as path from '../../exampleApiCommand/addExamples/node_modules/path';
import { BaseTemplateModel } from '../../../BaseTemplateModel';

export class TemplateModel extends BaseTemplateModel {
    static templatePath = ( append?: string ) => path.join('api', 'pg', 'addExamples', 'templateFiles' );
}

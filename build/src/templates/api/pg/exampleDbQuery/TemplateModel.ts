import * as path from 'path';
import { BaseTemplateModel } from '../../../BaseTemplateModel';

export class TemplateModel extends BaseTemplateModel {
    static templatePath = ( append?: string ) => path.join('api', 'pg', 'exampleDbQuery', 'templateFiles' );
}

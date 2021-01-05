import { BaseTemplateModel } from '../../../BaseTemplateModel';
import * as path from 'path';

export class TemplateModel extends BaseTemplateModel {
    public functionName: string;
    public dbTypeName: string;
    public operationName: string;
    public variablesName: string;

    static templatePath = ( append: string ) => path.join('api', 'pg', 'generateDbCodeQueries', 'templateFiles', append );
}

import * as path from 'path';
import { BaseTemplateModel } from '../../../BaseTemplateModel';

export type ResolversInfo = Array<{ name: string, operationType: 'queries' | 'commands', folderName: string }>;

export class TemplateModel extends BaseTemplateModel {
    resolvers: ResolversInfo;

    static templatePath = ( append: string ) => path.join('api', 'pg', 'generateApiQueryBuilder', 'templateFiles', append );
}

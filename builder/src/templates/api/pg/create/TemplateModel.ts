import * as path from 'path'
import { BaseTemplateModel } from '../../../BaseTemplateModel'

export class TemplateModel extends BaseTemplateModel {
  public name: string
  public port: number
  public envPortName: string
  public envSchemaName: string
  public dbName: string

  static templatePath = (append?: string) =>
    path.join('api', 'pg', 'create', 'templateFiles')
}

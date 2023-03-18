import * as path from 'path'
import { BaseTemplateModel } from '../../../BaseTemplateModel'

export class TemplateModel extends BaseTemplateModel {
  operationName: string
  operationResolverName: string
  operationInputName: string
  operationOutputName: string

  static templatePath = () =>
    path.join('api', 'pg', 'addApiCommand', 'templateFiles')
}

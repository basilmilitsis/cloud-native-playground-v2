import * as fs from 'fs'
import * as path from 'path'

export class PackageJsonUtils {
  static readPackageName(pathToProjectDir: string): string {
    const fullPath = path.join(pathToProjectDir, 'package.json')
    const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    return json.name
  }
}

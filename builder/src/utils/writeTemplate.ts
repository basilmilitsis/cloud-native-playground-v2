import { GluegunFilesystem, filesystem, GluegunPrint } from 'gluegun'
import * as path from 'path'
import { BaseTemplateModel } from '../templates/BaseTemplateModel'

type Generate = (
  options: /*GluegunTemplateGenerateOptions*/ any
) => Promise<string>

export async function writeTemplateSingle(
  templateModel: BaseTemplateModel,
  generate: Generate,
  print: GluegunPrint
): Promise<void> {
  console.log('===>', templateModel.localTemplatePath)

  await generate({
    template: templateModel.localTemplatePath,
    target: templateModel.relativeOutputPath,
    props: templateModel
  })
}
export async function writeTemplateRecursively(
  templateModel: BaseTemplateModel,
  generate: Generate,
  print: GluegunPrint
): Promise<void> {
  await writeRecursive(
    templateModel.localTemplatePath,
    templateModel,
    generate,
    filesystem,
    print
  )
}

async function writeRecursive(
  relativeTemplatePath: string,
  templateModel: BaseTemplateModel,
  generate: Generate,
  filesystem: GluegunFilesystem,
  print: GluegunPrint
) {
  const appDir = path.dirname(require.main.filename).replace('/bin', '')
  const fullTemplatePath = path.join(
    appDir,
    'src',
    'templates',
    relativeTemplatePath
  )

  console.log('===>', fullTemplatePath)

  if (filesystem.isDirectory(fullTemplatePath)) {
    console.log('Directory: ', fullTemplatePath)

    const directoryContents: string[] = filesystem.list(fullTemplatePath)
    directoryContents.forEach(async filePath => {
      const fullPath = path.join(relativeTemplatePath, filePath)
      await writeRecursive(fullPath, templateModel, generate, filesystem, print)
    })
    return
  } else {
    const destinationFilePath = getDestinationFilePath(
      relativeTemplatePath,
      templateModel.relativeOutputPath,
      templateModel.templateFileName
    )

    console.log('templatePath => ', relativeTemplatePath)
    console.log('destinationFilePath => ', destinationFilePath)

    await generate({
      template: relativeTemplatePath,
      target: destinationFilePath,
      props: templateModel
    })
    print.info(`Generated '${destinationFilePath}'`)
  }
}

function getDestinationFilePath(
  templateFilePath: string,
  relativeOutputPath: string,
  templateFileName?: string
): string {
  let localFilePath = templateFilePath.split('/templateFiles/')[1]
  if (!localFilePath) {
    localFilePath = ''
  }
  if (templateFileName) {
    localFilePath = localFilePath.replace(
      '<templateFileName>',
      templateFileName
    )
  }

  localFilePath = localFilePath.replace('.ejs', '')
  return path.join(relativeOutputPath, localFilePath)
}

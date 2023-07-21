import uploadConfig from '@config/mail/uploadConfig'
import aws, { S3 } from 'aws-sdk'
import path from 'path'
import mime from 'mime'
import { NotFoundError } from '@shared/errors/AppError'
import fs from 'fs'

export class S3StorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder)

    const contentType = mime.getType(originalPath)

    if (!contentType) {
      throw new NotFoundError('Image not found!')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async removeFile(file: string) {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise()

    return JSON.stringify('message: arquivo excluido com sucesso')
  }
}

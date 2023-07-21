import uploadConfig from '@config/mail/uploadConfig'
import fs from 'fs'
import path from 'path'

export class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }
    return fs.promises.unlink(filePath)
  }
}

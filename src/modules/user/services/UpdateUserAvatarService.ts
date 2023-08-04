import { injectable, inject } from 'tsyringe'
import { NotFoundError } from '@shared/errors/AppError'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import { IUserReturn } from '../domain/models/IUser'
import { IUpdateAvatarUser } from '../domain/models/IUpdateAvatarUser'
import uploadConfig from '@config/mail/uploadConfig'
import { S3StorageProvider } from '@shared/provider/S3StorageProvider'
import { DiskStorageProvider } from '@shared/provider/DiskStorageProvider'

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}
  public async executeUpdateAvatar({
    id,
    avatarFile,
  }: IUpdateAvatarUser): Promise<IUserReturn> {
    const user = await this.usersRepository.findById({ id })

    if (!user) {
      throw new NotFoundError('User not found!')
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider()

      if (user.avatar) {
        await s3Provider.removeFile(user.avatar)
      }
      const file = await s3Provider.saveFile(avatarFile)
      user.avatar = file
    } else {
      const diskProvider = new DiskStorageProvider()

      if (user.avatar && user.avatar !== null) {
        await diskProvider.deleteFile(user.avatar)
      }
      const file = await diskProvider.saveFile(avatarFile)
      user.avatar = file
    }

    await this.usersRepository.update(user)

    return user
  }
}

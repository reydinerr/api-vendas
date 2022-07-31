import { Request, Response } from 'express';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();
  }
}

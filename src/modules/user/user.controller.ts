import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { UserServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO, createJWT } from '../../utils/common.js';
import { JWT_ALGORITM } from './user.constant.js';
import * as Const from '../../utils/constants.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UserResponse from './response/user.response.js';
import LoggedUserResponse from './response/logged-user.response.js';
import UploadUserAvatarResponse from './response/upload-user-avatar.response.js';
import HttpError from '../../common/errors/http-error.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: Const.Path.Register,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto),
      ]
    });
    this.addRoute({
      path: Const.Path.Login,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto),
      ]
    });
    this.addRoute({
      path: Const.Path.UserAvatar,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware(Const.Entity.UserId),
        new UploadFileMiddleware(this.configService.get(Const.ConfigService.UploadDirectory), Const.Misc.Avatar),
      ]
    });
    this.addRoute({
      path: Const.Path.Login,
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        Const.Misc.UserController,
      );
    }

    const result = await this.userService.create(body, this.configService.get(Const.ConfigService.Salt));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get(Const.ConfigService.Salt));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        Const.Misc.Unauthorized,
        Const.Misc.UserController,
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get(Const.ConfigService.JwtSecret),
      {email: user.email, id: user.id}
    );

    this.ok(res, {
      ...fillDTO(LoggedUserResponse, user),
      token
    });
  }

  public async uploadAvatar(req: Request, res: Response) {
    const {userId} = req.params;
    const uploadFile = {avatarPath: req.file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }

  public async checkAuthenticate(req: Request, res: Response) {
    if (! req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        Const.Misc.Unauthorized,
        Const.Misc.UserController,
      );
    }

    const user = await this.userService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedUserResponse, user));
  }
}

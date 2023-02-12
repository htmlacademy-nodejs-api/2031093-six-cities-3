import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateUserDto from './dto/create-user.dto.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    throw new Error('[UserController] Oops');
  }
}

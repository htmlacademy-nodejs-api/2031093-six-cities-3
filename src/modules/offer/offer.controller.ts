import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/', method: HttpMethod.Delete, handler: this.delete});
  }

  public index(req: Request, res: Response): void {
    // Код обработчика
  }

  public create(req: Request, res: Response): void {
    // Код обработчика
  }

  public update(req: Request, res: Response): void {
    // Код обработчика
  }

  public delete(req: Request, res: Response): void {
    // Код обработчика
  }
}

import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CityServiceInterface } from './city-service.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import CityResponse from './response/city.response.js';
import CreateCityDto from './dto/create-city.dto.js';
import HttpError from '../../common/errors/http-error.js';

type ParamsGetCity = {
  cityId: string;
}

@injectable()
export default class CityController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({path: '/:cityId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetCity>,
    res: Response
  ): Promise<void> {
    const {cityId} = params;
    const offer = await this.cityService.findByCityId(cityId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${cityId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(CityResponse, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const cityResponse = fillDTO(CityResponse, cities);
    this.send(res, StatusCodes.OK, cityResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response
  ): Promise<void> {

    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `City with name «${body.name}» exists.`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(CityResponse, result)
    );
  }
}

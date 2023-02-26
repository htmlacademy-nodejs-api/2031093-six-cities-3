import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import * as core from 'express-serve-static-core';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CityServiceInterface } from './city-service.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { fillDTO } from '../../utils/common.js';
import * as Const from '../../utils/constants.js';
import CityResponse from './response/city.response.js';
import OfferResponse from '../offer/response/offer.response.js';
import CreateCityDto from './dto/create-city.dto.js';
import HttpError from '../../common/errors/http-error.js';

type ParamsGetCity = {
  cityId: string;
}

@injectable()
export default class CityController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CityController…');

    this.addRoute({
      path: Const.Path.CityId,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware(Const.Entity.CityId)],
    });
    this.addRoute({path: Const.Path.Root, method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: Const.Path.Root,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCityDto),
      ]
    });
    this.addRoute({
      path: Const.Path.CityOffers,
      method: HttpMethod.Get,
      handler: this.getOffersFromCity,
      middlewares: [new ValidateObjectIdMiddleware(Const.Entity.CityId)],
    });
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetCity>,
    res: Response
  ): Promise<void> {
    const {cityId} = params;
    const city = await this.cityService.findByCityId(cityId);

    if (!city) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `City with id ${cityId} not found.`,
        Const.Misc.CityController,
      );
    }

    this.ok(res, fillDTO(CityResponse, city));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const cityResponse = fillDTO(CityResponse, cities);
    this.send(res, StatusCodes.OK, cityResponse);
  }

  public async getOffersFromCity(
    {params, query}: Request<core.ParamsDictionary | ParamsGetCity, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findByCityId(params.cityId, query.limit);
    this.ok(res, fillDTO(OfferResponse, offers));
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
        Const.Misc.CityController,
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

import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import OfferResponse from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import HttpError from '../../common/errors/http-error.js';

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/', method: HttpMethod.Delete, handler: this.delete});
  }

  public async show(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async update(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {

    const existOffer = await this.offerService.findById(body.id);
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${body.id}» doesn't exist.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(body.id, body);
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(OfferResponse, result)
    );
  }

  public async delete(
    {body: {id: offerId}}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {

    const existOffer = await this.offerService.findById(offerId);
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» doesn't exist.`,
        'OfferController'
      );
    }

    const result = await this.offerService.deleteById(offerId);
    this.send(
      res,
      StatusCodes.GONE,
      fillDTO(OfferResponse, result)
    );
  }
}

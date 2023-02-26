import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import * as Const from '../../utils/constants.js';
import * as OfferConst from './offer.constant.js';
import OfferResponse from './response/offer.response.js';
import CommentResponse from '../comment/response/comment.response.js';
import UploadImageResponse from './response/upload-image.response.js';
import UploadPreviewImageResponse from './response/upload-preview-image.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: Const.Path.OfferId,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new DocumentExistsMiddleware(this.offerService, Const.Entity.Offer, Const.Entity.OfferId),
      ]
    });
    this.addRoute({path: Const.Path.Root, method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: Const.Path.Root,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });
    this.addRoute({path: Const.Path.BundlesPremium, method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({
      path: Const.Path.BundlesFavorite,
      method: HttpMethod.Get,
      handler: this.getFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: Const.Path.OfferId,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, Const.Entity.Offer, Const.Entity.OfferId),
      ]
    });
    this.addRoute({
      path: Const.Path.OfferId,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new DocumentExistsMiddleware(this.offerService, Const.Entity.Offer, Const.Entity.OfferId),
      ]
    });
    this.addRoute({
      path: Const.Path.OfferComments,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new DocumentExistsMiddleware(this.offerService, Const.Entity.Offer, Const.Entity.OfferId),
      ]
    });
    this.addRoute({
      path: Const.Path.OfferPreviewImage,
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new UploadFileMiddleware(this.configService.get(Const.ConfigService.UploadDirectory), Const.Misc.PreviewImage),
      ]
    });
    this.addRoute({
      path: Const.Path.OfferImage,
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(Const.Entity.OfferId),
        new UploadFileMiddleware(this.configService.get(Const.ConfigService.UploadDirectory), Const.Misc.Image),
      ]
    });
  }

  public async show(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {params} = req;
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    const {user} = req;
    if (!user && offer) {
      offer.isFavorite = false;
    }

    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async index(
    req: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.find();

    const {user} = req;
    if (!user) {
      offers.forEach((offer) => {
        offer.isFavorite = false;
      });
    }

    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async getPremium(_req: Request, res: Response) {
    const premiumOffers = await this.offerService.findPremium(OfferConst.DEFAULT_PREMIUM_OFFER_COUNT);
    this.ok(res, fillDTO(OfferResponse, premiumOffers));
  }

  public async getFavorite(_req: Request, res: Response) {
    const favoriteOffers = await this.offerService.findFavorite(OfferConst.DEFAULT_FAVORITE_OFFER_COUNT);
    this.ok(res, fillDTO(OfferResponse, favoriteOffers));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const {body, user} = req;

    const result = await this.offerService.create({...body, userId: user.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

  public async delete(
    {params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async uploadPreviewImage(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = req.params;
    const updateDto = { previewImage: req.file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageResponse, {updateDto}));
  }

  public async uploadImage(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {params: {offerId}, file} = req;
    const offer = await this.offerService.findById(offerId);
    const images = (offer && offer.images) ? [...offer.images] : [];
    if (file) {
      images.push(file.filename);
    }
    const updateDto = {images};
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }
}

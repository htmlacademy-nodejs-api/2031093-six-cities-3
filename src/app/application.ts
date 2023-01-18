import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { UserModel } from '../modules/user/user.entity.js';
import { OfferModel } from '../modules/offer/offer.entity.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const user = await UserModel.create({
      name: 'Keks',
      email: 'test@email.org',
      password: 'secret',
      avatarPath: 'keks.JpG',
      userType: 'pro'
     });
   console.log(user);
   const offer = await OfferModel.create({
     name: 'Keks',

    title: 'title title title',
    description: 'description description description description',
    postDate: '2023-01-18T19:16:23.704Z',
    city: 'Amsterdam',
    previewImage: 'previewImage',
    images: 'images',
    isPremium: true,
    isFavorite: false,
    rating: 4.4,
    type: 'hotel',
    maxAdults: 3,
    bedrooms: 5,
    price: 55000,
    categories: [],
    userId: user,
    commentsQuantity: 0,
    latitude: 48.85661,
    longitude: 2.351499,
    });
  console.log(offer);
  }
}

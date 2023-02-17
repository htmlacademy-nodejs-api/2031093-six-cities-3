import { Expose } from 'class-transformer';

import { Category } from '../../../types/category.enum.js';
import { CityName } from '../../../types/city-name.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: CityName;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public price!: number;

  @Expose()
  public categories!: Category[];

  @Expose()
  public userId!: string;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}

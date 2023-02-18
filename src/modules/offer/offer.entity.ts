import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Category } from '../../types/category.enum.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    required: true,
    default: '',
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    default: '',
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public cityId!: Ref<CityEntity>;

  @prop({
    required: true,
    default: '',
  })
  public previewImage!: string;

  @prop({
    required: true,
    default: [],
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
  })
  public isFavorite!: boolean;

  @prop({
    required: true,
    default: 0,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType,
    default: OfferType.Hotel,
  })
  public type!: OfferType;

  @prop({
    required: true,
    default: 0,
  })
  public maxAdults!: number;

  @prop({
    required: true,
    default: 0,
  })
  public bedrooms!: number;

  @prop({
    required: true,
    default: 0,
  })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    enum: Category,
    default: [],
  })
  public categories!: Category[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public commentsQuantity!: number;

  @prop({
    required: true,
  })
  public latitude!: number;

  @prop({
    required: true,
  })
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);

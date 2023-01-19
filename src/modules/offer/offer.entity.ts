import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { CityName } from '../../types/city-name.enum.js';
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
    minlength: [10, 'Min length for title is 10 symbols'],
    maxlength: [100, 'Max length for title is 100 symbols'],
    default: '',
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: [20, 'Min length for description is 20 symbols'],
    maxlength: [1024, 'Max length for description is 1024 symbols'],
    default: '',
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: CityName,
    default: CityName.Amsterdam,
  })
  public city!: CityName;

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
    min: [1, 'Min value for rating is 1'],
    max: [5, 'Max value for rating is 5'],
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
    min: [1, 'Min value for maxAdults is 1'],
    max: [10, 'Max value for maxAdults is 10'],
    default: 0,
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: [1, 'Min value for bedrooms is 1'],
    max: [8, 'Max value for bedrooms is 8'],
    default: 0,
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: [100, 'Min value for price is 100'],
    max: [100000, 'Max value for price is 100 000'],
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

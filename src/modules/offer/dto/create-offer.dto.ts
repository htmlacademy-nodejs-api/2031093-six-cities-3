import {
  IsArray, IsDateString, IsEnum,
  IsInt, IsNumber, IsBoolean, IsMongoId,
  Max, MaxLength, Min, MinLength
} from 'class-validator';

import { OfferType } from '../../../types/offer-type.enum.js';
import { Category } from '../../../types/category.enum.js';
import { PRICE_MAX_DECIMAL_PLACES, RATING_MAX_DECIMAL_PLACES } from '../offer.constant.js';

export default class CreateOfferDto {

  @MinLength(10, {message: 'Min length for title is 10 symbols'})
  @MaxLength(100, {message: 'Max length for title is 100 symbols'})
  public title!: string;

  @MinLength(20, {message: 'Min length for description is 20 symbols'})
  @MaxLength(1024, {message: 'Max length for description is 1024 symbols'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsMongoId({message: 'cityId field must be valid an id'})
  public cityId!: string;

  @MaxLength(256, {message: 'Too long for field «image»'})
  public previewImage!: string;

  @IsArray({message: 'Field images must be an array'})
  @MaxLength(256, {each: true, message: 'Too short for field «image»'})
  public images!: string[];

  @IsBoolean({message: 'isPremium must be an boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'isFavorite must be an boolean'})
  public isFavorite!: boolean;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: RATING_MAX_DECIMAL_PLACES,
  }, {message: 'rating must be a number'})
  @Min(1, {message: 'Min value for rating is 1'})
  @Max(5, {message: 'Max value for rating is 5'})
  public rating!: number;

  @IsEnum(OfferType, {message: `type must be one of: ${Object.values(OfferType).join(', ')}`})
  public type!: OfferType;

  @IsInt({message: 'maxAdults must be an integer'})
  @Min(1, {message: 'Min value for maxAdults is 1'})
  @Max(10, {message: 'Max value for maxAdults is 10'})
  public maxAdults!: number;

  @IsInt({message: 'bedrooms must be an integer'})
  @Min(1, {message: 'Min value for bedrooms is 1'})
  @Max(8, {message: 'Max value for bedrooms is 8'})
  public bedrooms!: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: PRICE_MAX_DECIMAL_PLACES,
  }, {message: 'price must be a number'})
  @Min(100, {message: 'Min value for price is 100'})
  @Max(100000, {message: 'Max value for price is 100 000'})
  public price!: number;

  @IsArray({message: 'Field categories must be an array'})
  @IsEnum(Category, {each: true, message: `categories must be values of: ${Object.values(Category).join(', ')}`})
  public categories!: Category[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, {message: 'latitude must be a number'})
  public latitude!: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, {message: 'longitude must be a number'})
  public longitude!: number;
}

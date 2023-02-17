import { OfferType } from '../../../types/offer-type.enum.js';
import { Category } from '../../../types/category.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public cityId!: string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public maxAdults!: number;
  public bedrooms!: number;
  public price!: number;
  public categories!: Category[];
  public userId!: string;
  public latitude!: number;
  public longitude!: number;
}

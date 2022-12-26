import { Location } from './location.type';
import { User } from './user.type';
import { Category } from './category.enum';
import { CityName } from './city-name.enum';
import { OfferType } from './offer-type.enum';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  maxAdults: number;
  bedrooms: number;
  price: number;
  categories: Category[];
  host: User;
  commentsQuantity: number;
  location: Location;
}

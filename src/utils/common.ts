import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';

import { Category } from '../types/category.enum.js';
import { CityName } from '../types/city-name.enum.js';
import { OfferType } from '../types/offer-type.enum.js';
import { UserType } from '../types/user-type.enum.js';
import { Location } from '../types/location.type.js';
import { Offer } from '../types/offer.type.js';
import { User } from '../types/user.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, city, previewImage, images, isPremium, isFavorite,
    rating, type, maxAdults, bedrooms, price, categories, commentsQuantity,
    name, email, userType, avatarPath, latitude, longitude] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: CityName[city as keyof typeof CityName] as CityName,
    previewImage,
    images: images.split(';'),
    isPremium: (isPremium === 'true'),
    isFavorite: (isFavorite === 'true'),
    rating: Number.parseInt(rating, 10),
    type: OfferType[type as keyof typeof OfferType] as OfferType,
    maxAdults: Number.parseInt(maxAdults, 10),
    bedrooms: Number.parseInt(bedrooms, 10),
    price: Number.parseInt(price, 10),
    categories: categories.split(';')
      .map((cat) => Category[cat as keyof typeof Category]) as Category[],
    host: {
      name,
      email,
      avatarPath,
      userType: UserType[userType as keyof typeof UserType] as UserType,
    } as User,
    commentsQuantity: commentsQuantity ? Number.parseInt(commentsQuantity, 10) : 0,
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    } as Location,
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance( someDto, plainObject, { excludeExtraneousValues: true } );

export const createErrorObject = (message: string) => ({
  error: message,
});

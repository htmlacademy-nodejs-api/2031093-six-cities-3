import * as jose from 'jose';
import crypto from 'crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';

import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';
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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

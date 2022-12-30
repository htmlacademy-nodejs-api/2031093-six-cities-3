import { Category } from '../types/category.enum.js';
import { CityName } from '../types/city-name.enum.js';
import { OfferType } from '../types/offer-type.enum.js';
import { Location } from '../types/location.type.js';
import { Offer } from '../types/offer.type.js';
import { User } from '../types/user.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, city, previewImage, images, isPremium, isFavorite,
    rating, type, maxAdults, bedrooms, price, categories, commentsQuantity,
    name, email, password, avatarPath, latitude, longitude] = tokens;

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
    host: {name, email, password, avatarPath} as User,
    commentsQuantity: commentsQuantity ? Number.parseInt(commentsQuantity, 10) : 0,
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    } as Location,
  } as Offer;
}

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

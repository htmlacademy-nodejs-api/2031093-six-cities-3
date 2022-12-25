import { readFileSync } from 'fs';

import { FileReaderInterface } from './file-reader.interface';
import { Category } from '../../types/category.enum';
import { CityName } from '../../types/city-name.enum';
import { OfferType } from '../../types/offer-type.enum';
import { Location } from '../../types/location.type';
import { Offer } from '../../types/offer.type';
import { User } from '../../types/user.type';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
          title, description, postDate, city, previewImage, images, isPremium, isFavorite,
          rating, type, maxAdults, bedrooms, price, categories, commentsQuantity,
          name, email, password, avatarPath, latitude, longitude
        ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: CityName[city as keyof typeof CityName] as CityName,
        previewImage,
        images: images.split(';'),
        isPremium: (isPremium === "true"),
        isFavorite: (isFavorite === "true"),
        rating: Number.parseInt(rating, 10),
        type: OfferType[type as keyof typeof OfferType] as OfferType,
        maxAdults: Number.parseInt(maxAdults, 10),
        bedrooms: Number.parseInt(bedrooms, 10),
        price: Number.parseInt(price, 10),
        categories: categories.split(';')
          .map((cat) => Category[cat as keyof typeof Category]) as Category[],
        host: {name, email, password, avatarPath} as User,
        commentsQuantity: Number.parseInt(commentsQuantity, 10),
        location: {
          latitude: Number.parseInt(latitude, 10),
          longitude: Number.parseInt(longitude, 10),
        } as Location,
      }));
  }
}

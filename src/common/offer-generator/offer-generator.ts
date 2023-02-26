import dayjs from 'dayjs';

import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import * as Const from '../../utils/constants.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(Const.WeekDay.First, Const.WeekDay.Last), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.offerImages);
    const images = getRandomItems<string>(this.mockData.offerImages).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1)).toString();
    const isFavorite = Boolean(generateRandomValue(0, 1)).toString();
    const rating = generateRandomValue(Const.Rating.Min, Const.Rating.Max, Const.Rating.FloatingPointLength).toString();
    const type = getRandomItem([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const maxAdults = generateRandomValue(Const.MaxAdults.Min, Const.MaxAdults.Max).toString();
    const bedrooms = generateRandomValue(Const.Bedrooms.Min, Const.Bedrooms.Max).toString();
    const price = generateRandomValue(Const.Price.Min, Const.Price.Max).toString();
    const categories = getRandomItems<string>(this.mockData.categories).join(';');
    const commentsQuantity = generateRandomValue(Const.CommentsQuantity.Min, Const.CommentsQuantity.Max).toString();
    const name = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const userType = getRandomItem([UserType.Common, UserType.Pro]);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const [latitude, longitude] = getRandomItem<string>(this.mockData.coordinates).split(' ');

    return [
      title, description, postDate, city, previewImage, images, isPremium, isFavorite,
      rating, type, maxAdults, bedrooms, price, categories, commentsQuantity,
      name, email, userType, avatarPath, latitude, longitude,
    ].join('\t');
  }
}

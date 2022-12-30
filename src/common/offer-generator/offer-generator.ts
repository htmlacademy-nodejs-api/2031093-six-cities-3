import dayjs from 'dayjs';

import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import * as Const from '../../utils/constants.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(Const.FIRST_WEEK_DAY, Const.LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.offerImages);
    const images = getRandomItems<string>(this.mockData.offerImages).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1)).toString();
    const isFavorite = Boolean(generateRandomValue(0, 1)).toString();
    const rating = generateRandomValue(Const.RATING_MIN, Const.RATING_MAX, Const.RATING_FLOATING_POIN_LEN).toString();
    const type = getRandomItem([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const maxAdults = generateRandomValue(Const.MAX_ADULTS_MIN, Const.MAX_ADULTS_MAX).toString();
    const bedrooms = generateRandomValue(Const.BEDROOMS_MIN, Const.BEDROOMS_MAX).toString();
    const price = generateRandomValue(Const.PRICE_MIN, Const.PRICE_MAX).toString();
    const categories = getRandomItems<string>(this.mockData.categories).join(';');
    const commentsQuantity = generateRandomValue(Const.COMMENTS_QTY_MIN, Const.COMMENTS_QTY_MAX).toString();
    const name = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const password = email.split('@')[0];
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const [latitude, longitude] = getRandomItem<string>(this.mockData.coordinates).split(' ');

    return [
      title, description, postDate, city, previewImage, images, isPremium, isFavorite,
      rating, type, maxAdults, bedrooms, price, categories, commentsQuantity,
      name, email, password, avatarPath, latitude, longitude,
    ].join('\t');
  }
}

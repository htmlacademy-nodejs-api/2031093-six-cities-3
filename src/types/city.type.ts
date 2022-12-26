import { Location } from './location.type';
import { CityName } from './city-name.enum';

export type City = {
  location: Location;
  name: CityName;
}

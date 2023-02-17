import { CityName } from '../../../types/city-name.enum';

export default class CreateCityDto {
  public name!: CityName;
  public latitude!: number;
  public longitude!: number;
}

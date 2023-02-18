import { IsEnum, IsNumber } from 'class-validator';

import { CityName } from '../../../types/city-name.enum.js';

export default class CreateCityDto {

  @IsEnum(CityName, {message: `name must be one of: ${Object.values(CityName).join(', ')}`})
  public name!: CityName;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, {message: 'latitude is required'})
  public latitude!: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, {message: 'longitude is required'})
  public longitude!: number;
}

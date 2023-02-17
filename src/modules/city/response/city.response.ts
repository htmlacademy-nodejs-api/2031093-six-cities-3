import { Expose } from 'class-transformer';

import { CityName } from '../../../types/city-name.enum.js';

export default class CityResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: CityName;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}

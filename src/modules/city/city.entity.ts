import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { City } from '../../types/city.type.js';
import { CityName } from '../../types/city-name.enum.js';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends defaultClasses.TimeStamps implements City {

  @prop({
    required: true,
    type: () => String,
    enum: CityName,
    default: CityName.Paris,
  })
  public name!: CityName;

  @prop({
    required: true,
    default: 0,
  })
  public latitude!: number;

  @prop({
    required: true,
    default: 0,
  })
  public longitude!: number;
}

export const CityModel = getModelForClass(CityEntity);

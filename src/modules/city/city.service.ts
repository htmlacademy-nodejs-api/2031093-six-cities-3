import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';

import { CityServiceInterface } from './city-service.interface.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CityEntity } from './city.entity.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import * as Const from '../../utils/constants.js';
import CreateCityDto from './dto/create-city.dto.js';

@injectable()
export default class CityService implements CityServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CityModel) private readonly cityModel: ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName}).exec();
  }

  public async findByCityNameOrCreate(cityName: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel
      .aggregate([
        {
          $lookup: {
            from: Const.Misc.Offers,
            let: { cityId: Const.Property._id },
            pipeline: [
              { $match: { [Const.Entity.CityId] : Const.Property.Cities } },
              { $project: { _id: 1}}
            ],
            as: Const.Misc.Offers
          },
        },
        { $addFields:
            { id: { $toString: Const.Property._id}, offerCount: { $size: Const.Property.Offers } }
        },
        { $unset: Const.Misc.Offers },
        { $sort: { offerCount: SortType.Down } }
      ]).exec();
  }
}

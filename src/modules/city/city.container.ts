import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CityServiceInterface } from './city-service.interface.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import { CityEntity, CityModel } from './city.entity.js';
import { Component } from '../../types/component.types.js';
import CityService from './city.service.js';
import CityController from './city.controller.js';

const cityContainer = new Container();

cityContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService);
cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
cityContainer.bind<ControllerInterface>(Component.CityController).to(CityController).inSingletonScope();

export { cityContainer };

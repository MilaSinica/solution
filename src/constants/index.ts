import { CarSize } from '../domainModels/car';

export const FUEL_PRICE_PER_LITRE = 1.75;

export const PARKING_FEE: Record<CarSize | string, number> = {
  [CarSize.Small]: 25,
  [CarSize.Large]: 35,
};

export const FUEL_LEVEL_REFILL_BOUND = 0.1;

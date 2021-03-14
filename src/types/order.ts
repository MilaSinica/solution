import { CarSize } from '../domainModels/car';
import { Employee } from '../domainModels/employee';
import { FuelDto } from './fuel';

export type OrderDto = {
  licencePlate: string;
  size: CarSize | string;
  fuel: FuelDto;
};

export type ProcessingOrderDto = {
  licencePlate: string;
  fuelAdded: number;
  price: number;
};

export type ProcessedOrderDto = Override<ProcessingOrderDto, { employee: Employee['id'] }>;

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

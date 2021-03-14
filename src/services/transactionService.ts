import { Car } from '../domainModels/car';
import { Employee } from '../domainModels/employee';
import { FuelAddedDto } from '../types';
import { FUEL_PRICE_PER_LITRE, FUEL_LEVEL_REFILL_BOUND, PARKING_FEE } from '../constants';

export class TransactionService {
  public calculateFuelFee = (client: Car): FuelAddedDto => {
    const { fuelCapacity, fuelLevel } = client;
    if (fuelLevel <= FUEL_LEVEL_REFILL_BOUND) {
      const fuelAdded = fuelCapacity * (1 - fuelLevel);
      const fee = fuelAdded * FUEL_PRICE_PER_LITRE;
      return {
        fee,
        fuelAdded,
      };
    }

    return {
      fuelAdded: 0,
      fee: 0,
    };
  };

  public calculateParkingFee = (client: Car): number => {
    const { size } = client;
    const fee = PARKING_FEE[size];
    return fee || 0;
  };
}

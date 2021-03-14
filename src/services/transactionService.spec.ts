import { CarSize, Car } from '../domainModels/car';
import { FUEL_LEVEL_REFILL_BOUND, FUEL_PRICE_PER_LITRE, PARKING_FEE } from '../constants';
import { TransactionService } from './transactionService';
import { OrderDto } from '../types';

describe('TransactionService', () => {
  let service: TransactionService;

  const getOrder = (custom?: Partial<OrderDto>): OrderDto => ({
    licencePlate: 'A',
    size: CarSize.Small,
    fuel: {
      capacity: 57,
      level: 0.07,
    },
    ...custom,
  });

  const createNewClient = (custom?: Partial<OrderDto>): Car => new Car(getOrder(custom));

  beforeAll(() => {
    service = new TransactionService();
  });

  describe('calculateFuelFee.', () => {
    it('should not assign fee and fuelAdded to order above fuel level refill bound', () => {
      const client = createNewClient({ fuel: { level: FUEL_LEVEL_REFILL_BOUND + 0.1, capacity: 40 } });

      const result = service.calculateFuelFee(client);
      expect(result.fuelAdded).toEqual(0);
      expect(result.fee).toEqual(0);
    });

    it('should calculate fee and fuelAdded to order equal to fuel level refill bound', () => {
      // given
      const level = FUEL_LEVEL_REFILL_BOUND;
      const capacity = 40;
      const client = createNewClient({ fuel: { level, capacity } });

      // when
      const result = service.calculateFuelFee(client);

      //then
      expect(result.fuelAdded).toBeDefined();
      expect(result.fee).toBeDefined();
      expect(result.fuelAdded).toBeGreaterThan(0);
      expect(result.fee).toBeGreaterThan(0);
    });

    it('should calculate correct fee and fuel volume', () => {
      // given
      const level = 0.01;
      const capacity = 40;
      const client = createNewClient({ fuel: { level, capacity } });

      // when
      const result = service.calculateFuelFee(client);

      // then
      const expectedFuelAdded = 39.6;
      const expectedFee = expectedFuelAdded * FUEL_PRICE_PER_LITRE;

      expect(result.fuelAdded).toEqual(expectedFuelAdded);
      expect(result.fee).toEqual(expectedFee);
    });
  });

  describe('calculateParkingFee.', () => {
    it('should not assign fee if no car size allowed', () => {
      const client = createNewClient({ size: 'tram' });

      const result = service.calculateParkingFee(client);
      expect(result).toEqual(0);
    });

    it('should calculate correct fee', () => {
      // given
      const size = CarSize.Small;
      const client = createNewClient({ size });

      // when
      const result = service.calculateParkingFee(client);

      // then
      const expectedFee = PARKING_FEE.small;
      expect(result).toEqual(expectedFee);
    });
  });
});

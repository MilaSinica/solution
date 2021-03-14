import { Car, CarSize } from './car';
import { OrderDto } from '../types';

describe('Car', () => {
  const getOrder = (custom?: Partial<OrderDto>): OrderDto => ({
    licencePlate: 'A',
    size: CarSize.Small,
    fuel: {
      capacity: 57,
      level: 0.07,
    },
    ...custom,
  });

  const expectedCar = {
    licencePlate: 'A',
    size: CarSize.Small,
    fuelCapacity: 57,
    fuelLevel: 0.07,
  };

  describe('create.', () => {
    it("shouldn't create if required data is not defined", () => {
      let given = getOrder({ licencePlate: undefined });
      expect(() => new Car(given)).toThrowError();

      given = getOrder({ size: undefined });
      expect(() => new Car(given)).toThrowError();

      given = getOrder({ fuel: undefined });
      expect(() => new Car(given)).toThrowError();
    });

    it("shouldn't create if fuel level is out of range", () => {
      const given = getOrder({ fuel: { level: 8, capacity: 20 } });
      expect(() => new Car(given)).toThrowError();
    });

    it('should create', () => {
      const given = getOrder();
      expect(new Car(given)).toEqual(expectedCar);
    });
  });
});

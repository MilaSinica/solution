import { ProcessedOrderDto } from '../types';
import { OrderProcessingService } from './orderProcessingService';

describe('OrderProcessingService', () => {
  let service: OrderProcessingService;

  const testData = [
    {
      licencePlate: 'A',
      size: 'large',
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    },
    {
      licencePlate: 'B',
      size: 'large',
      fuel: {
        capacity: 66,
        level: 0.59,
      },
    },
    {
      licencePlate: 'C',
      size: 'large',
      fuel: {
        capacity: 54,
        level: 0.49,
      },
    },
    {
      licencePlate: 'D',
      size: 'large',
      fuel: {
        capacity: 79,
        level: 0.93,
      },
    },
    {
      licencePlate: 'E',
      size: 'large',
      fuel: {
        capacity: 94,
        level: 0.2,
      },
    },
    {
      licencePlate: 'F',
      size: 'large',
      fuel: {
        capacity: 57,
        level: 0.1,
      },
    },
    {
      licencePlate: 'G',
      size: 'small',
      fuel: {
        capacity: 56,
        level: 0.05,
      },
    },
    {
      licencePlate: 'H',
      size: 'small',
      fuel: {
        capacity: 61,
        level: 0.78,
      },
    },
    {
      licencePlate: 'I',
      size: 'small',
      fuel: {
        capacity: 60,
        level: 0.65,
      },
    },
    {
      licencePlate: 'J',
      size: 'large',
      fuel: {
        capacity: 63,
        level: 0.01,
      },
    },
  ];

  const firstEmployee = {
    id: 'A',
    comissionRate: 0.11,
  };
  const secondEmployee = {
    id: 'B',
    comissionRate: 0.15,
  };
  const thirdEmployee = {
    id: 'C',
    comissionRate: 0.21,
  };
  const fourthEmployee = {
    id: 'D',
    comissionRate: 0.31,
  };

  beforeAll(() => {
    service = new OrderProcessingService();
  });

  describe('getAssignments: equal number of orders between workers', () => {
    let result: Array<ProcessedOrderDto>;

    beforeAll(() => {
      result = service.getAssignments(testData, [firstEmployee, secondEmployee]);
    });

    it('should process every order', () => {
      expect(result.length).toEqual(testData.length);
    });

    it('should add price, fuelAmount and licencePlate data', () => {
      result.forEach((order) => {
        expect(order.price).toBeGreaterThanOrEqual(0);
        expect(order.fuelAdded).toBeDefined();
        expect(order.fuelAdded).toBeGreaterThanOrEqual(0);
        expect(order.licencePlate).toBeDefined();
        expect(order.employee).toBeDefined();
      });
    });

    it('should distribute orders between employees to equal or equal +/-  1 parts', () => {
      let firstEmployeeOrders = 0;
      let secondEmployeeOrders = 0;

      result.forEach((order) => {
        if (order.employee === firstEmployee.id) {
          firstEmployeeOrders += 1;
        } else {
          secondEmployeeOrders += 1;
        }
      });

      expect(firstEmployeeOrders).toEqual(5);
      expect(secondEmployeeOrders).toEqual(5);
    });

    it('should distribute higher price orders to employee with lower comission rate and visa versa', () => {
      const sortedResult = result.sort((o1, o2) => o2.price - o1.price);
      expect(sortedResult[0].employee).toEqual(firstEmployee.id);
      expect(sortedResult[1].employee).toEqual(firstEmployee.id);
      expect(sortedResult[2].employee).toEqual(firstEmployee.id);
      expect(sortedResult[3].employee).toEqual(firstEmployee.id);
      expect(sortedResult[4].employee).toEqual(firstEmployee.id);
      expect(sortedResult[5].employee).toEqual(secondEmployee.id);
      expect(sortedResult[6].employee).toEqual(secondEmployee.id);
      expect(sortedResult[7].employee).toEqual(secondEmployee.id);
      expect(sortedResult[8].employee).toEqual(secondEmployee.id);
      expect(sortedResult[9].employee).toEqual(secondEmployee.id);
    });
  });

  describe('getAssignments: not equal number of orders between workers', () => {
    let result: Array<ProcessedOrderDto>;

    beforeAll(() => {
      result = service.getAssignments(testData, [firstEmployee, secondEmployee, thirdEmployee, fourthEmployee]);
    });

    it('should process every order', () => {
      expect(result.length).toEqual(testData.length);
    });

    it('should add price, fuelAmount and licencePlate data', () => {
      result.forEach((order) => {
        expect(order.price).toBeGreaterThanOrEqual(0);
        expect(order.fuelAdded).toBeDefined();
        expect(order.fuelAdded).toBeGreaterThanOrEqual(0);
        expect(order.licencePlate).toBeDefined();
        expect(order.employee).toBeDefined();
      });
    });

    it('should distribute orders between employees to equal or equal +/-  1 parts', () => {
      const assignmentMap = {} as Record<string, number>;
      result.forEach((order) => {
        assignmentMap[order.employee] = assignmentMap[order.employee] ? assignmentMap[order.employee] + 1 : 1;
      });

      expect(assignmentMap[firstEmployee.id]).toEqual(3);
      expect(assignmentMap[secondEmployee.id]).toEqual(3);
      expect(assignmentMap[thirdEmployee.id]).toEqual(2);
      expect(assignmentMap[fourthEmployee.id]).toEqual(2);
    });

    it('should distribute higher price orders to employee with lower comission rate and visa versa', () => {
      const sortedResult = result.sort((o1, o2) => o2.price - o1.price);
      expect(sortedResult[0].employee).toEqual(firstEmployee.id);
      expect(sortedResult[1].employee).toEqual(firstEmployee.id);
      expect(sortedResult[2].employee).toEqual(firstEmployee.id);
      expect(sortedResult[3].employee).toEqual(secondEmployee.id);
      expect(sortedResult[4].employee).toEqual(secondEmployee.id);
      expect(sortedResult[5].employee).toEqual(secondEmployee.id);
      expect(sortedResult[6].employee).toEqual(thirdEmployee.id);
      expect(sortedResult[7].employee).toEqual(thirdEmployee.id);
      expect(sortedResult[8].employee).toEqual(fourthEmployee.id);
      expect(sortedResult[9].employee).toEqual(fourthEmployee.id);
    });
  });

  describe('getAssignments: 1 worker', () => {
    let result: Array<ProcessedOrderDto>;

    beforeAll(() => {
      result = service.getAssignments(testData, [firstEmployee]);
    });

    it('should process every order', () => {
      expect(result.length).toEqual(testData.length);
    });

    it('should distribute all orders to first worker', () => {
      result.forEach((res) => expect(res.employee).toEqual(firstEmployee.id));
    });
  });
});

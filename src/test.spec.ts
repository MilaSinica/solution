import { OrderProcessingService } from './services/orderProcessingService';
import { ProcessedOrderDto } from './types';

describe('Solution', () => {
    const testData = [{
        "licencePlate": "A",
        "size": "large",
        "fuel": {
            "capacity": 57,
            "level": 0.07
        }
    }, {
        "licencePlate": "B",
        "size": "large",
        "fuel": {
            "capacity": 66,
            "level": 0.59
        }
    }, {
        "licencePlate": "C",
        "size": "large",
        "fuel": {
            "capacity": 54,
            "level": 0.49
        }
    }, {
        "licencePlate": "D",
        "size": "large",
        "fuel": {
            "capacity": 79,
            "level": 0.93
        }
    }, {
        "licencePlate": "E",
        "size": "large",
        "fuel": {
            "capacity": 94,
            "level": 0.2
        }
    }, {
        "licencePlate": "F",
        "size": "large",
        "fuel": {
            "capacity": 57,
            "level": 0.1
        }
    }, {
        "licencePlate": "G",
        "size": "small",
        "fuel": {
            "capacity": 56,
            "level": 0.05
        }
    }, {
        "licencePlate": "H",
        "size": "small",
        "fuel": {
            "capacity": 61,
            "level": 0.78
        }
    }, {
        "licencePlate": "I",
        "size": "small",
        "fuel": {
            "capacity": 60,
            "level": 0.65
        }
    }, {
        "licencePlate": "J",
        "size": "large",
        "fuel": {
            "capacity": 63,
            "level": 0.01
        }
    }];

    const employees = [{
        "id": "A",
        "comissionRate": 0.11
    }, {
        "id": "B",
        "comissionRate": 0.15
    }];

    let service: OrderProcessingService;
    let solution: Array<ProcessedOrderDto>;

    beforeAll(() => {
        service = new OrderProcessingService();
        solution = service.getAssignments(testData, employees);
        console.log(solution);
      });

    it("should assign orders to workers equally and maximazing profit", () => {
        expect(solution[0].employee).toEqual(employees[0].id);
        expect(solution[1].employee).toEqual(employees[0].id);
        expect(solution[2].employee).toEqual(employees[0].id);
        expect(solution[3].employee).toEqual(employees[0].id);
        expect(solution[4].employee).toEqual(employees[0].id);
        expect(solution[5].employee).toEqual(employees[1].id);
        expect(solution[6].employee).toEqual(employees[1].id);
        expect(solution[7].employee).toEqual(employees[1].id);
        expect(solution[8].employee).toEqual(employees[1].id);
        expect(solution[9].employee).toEqual(employees[1].id);
    });

});

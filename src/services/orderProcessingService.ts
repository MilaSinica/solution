import { Car } from '../domainModels/car';
import { OrderDto, ProcessedOrderDto, ProcessingOrderDto } from '../types';
import { Employee, EmployeeDto } from '../domainModels/employee';
import { TransactionService } from './transactionService';

export class OrderProcessingService {
  private readonly transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  private calculateOrderPriceAndSortByPrice = (orders: Array<OrderDto>): Array<ProcessingOrderDto> => {
    return orders
      .map((order) => {
        const client = new Car(order);
        const { fee: fuelFee, fuelAdded } = this.transactionService.calculateFuelFee(client);
        const parkingFee = this.transactionService.calculateParkingFee(client);
        const price = Number((fuelFee + parkingFee).toFixed(2));
        return {
          licencePlate: client.licencePlate,
          fuelAdded,
          price,
        };
      })
      .sort((o1, o2) => o2.price - o1.price);
  };

  private sortEmployeesByComission = (employees: Array<EmployeeDto>): Array<Employee> => {
    return employees.map((e) => new Employee(e)).sort((e1, e2) => e1.comissionRate - e2.comissionRate);
  };

  public calculateFairOrderDistributionAmongEmployees = (orderCount: number, employeeCount: number): Array<number> => {
    const fairNumberOfOrdersPerEmployee = Math.floor(orderCount / employeeCount);
    let numberOfOrderResidue = orderCount - fairNumberOfOrdersPerEmployee * employeeCount;

    const orderList = [] as Array<number>;
    for (let i = 0; i < employeeCount; i++) {
      let numberOfOrders = 0;
      if (numberOfOrderResidue) {
        numberOfOrders = fairNumberOfOrdersPerEmployee + 1;
        numberOfOrderResidue -= 1;
      } else {
        numberOfOrders = fairNumberOfOrdersPerEmployee;
      }
      orderList.push(numberOfOrders);
    }

    return orderList;
  };

  private assignOrders = (
    orders: Array<ProcessingOrderDto>,
    employees: Array<EmployeeDto>,
    orderDistributionList: Array<number>
  ): Array<ProcessedOrderDto> => {
    let employeeIndex = 0;
    let clientsToAssign = orderDistributionList[employeeIndex];

    return orders.map((order) => {
      const employee = employees[employeeIndex];
      const processedOrder = { ...order } as ProcessedOrderDto;
      processedOrder.employee = employee.id;
      clientsToAssign -= 1;
      if (clientsToAssign === 0) {
        employeeIndex += 1;
        if (employeeIndex < employees.length) {
          clientsToAssign = orderDistributionList[employeeIndex];
        }
      }
      return processedOrder;
    });
  };

  public getAssignments = (orders: Array<OrderDto>, employees: Array<EmployeeDto>): Array<ProcessedOrderDto> => {
    const processingOrders = this.calculateOrderPriceAndSortByPrice(orders);
    const sortedEmployees = this.sortEmployeesByComission(employees);

    const orderDistributionList = this.calculateFairOrderDistributionAmongEmployees(
      processingOrders.length,
      sortedEmployees.length
    );

    return this.assignOrders(processingOrders, sortedEmployees, orderDistributionList);
  };
}

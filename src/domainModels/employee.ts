import { DomainModelValidator } from './domainModelValidator';

const comissionRateRange = { min: 0, max: 1 };

export type EmployeeDto = {
  comissionRate: number;
  id: string;
};

export class Employee {
  public comissionRate: number;
  public id: string;

  constructor(employeeData: EmployeeDto) {
    const { comissionRate, id } = employeeData;
    this.comissionRate = comissionRate;
    this.id = id;

    this.validate();
  }

  private validate(): void {
    const validator = new DomainModelValidator(this);

    validator.checkRequiredField('comissionRate');
    validator.checkRequiredField('id');

    validator.checkNumberRange('comissionRate', comissionRateRange);
  }
}

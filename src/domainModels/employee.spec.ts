import { Employee, EmployeeDto } from './employee';

describe('Employee', () => {
  const getEmloyee = (custom?: Partial<EmployeeDto>): EmployeeDto => ({
    id: 'A',
    comissionRate: 0.1,
    ...custom,
  });

  const expectedEmployee = {
    id: 'A',
    comissionRate: 0.1,
  };

  describe('create.', () => {
    it("shouldn't create if required data is not defined", () => {
      let given = getEmloyee({ id: undefined });
      expect(() => new Employee(given)).toThrowError();

      given = getEmloyee({ comissionRate: undefined });
      expect(() => new Employee(given)).toThrowError();
    });

    it("shouldn't create if comission rate is out of range", () => {
      const given = getEmloyee({ comissionRate: 8 });
      expect(() => new Employee(given)).toThrowError();
    });

    it('should create', () => {
      const given = getEmloyee();
      expect(new Employee(given)).toEqual(expectedEmployee);
    });
  });
});

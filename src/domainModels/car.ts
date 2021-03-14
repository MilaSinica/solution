import { DomainModelValidator } from './domainModelValidator';
import { FuelDto } from '../types';

export enum CarSize {
  Small = 'small',
  Large = 'large',
}

const fuelLevelRange = { min: 0, max: 1 };

export class Car {
  public size: string | CarSize;
  public licencePlate: string;
  public fuelLevel: number;
  public fuelCapacity: number;

  constructor({ size, licencePlate, fuel }: { size: string; licencePlate: string; fuel: FuelDto }) {
    this.size = size;
    this.licencePlate = licencePlate;
    this.fuelLevel = fuel.level;
    this.fuelCapacity = fuel.capacity;

    this.validate();
  }

  private validate(): void {
    const validator = new DomainModelValidator(this);

    validator.checkRequiredField('size');
    validator.checkRequiredField('licencePlate');
    validator.checkRequiredField('fuelLevel');
    validator.checkRequiredField('fuelCapacity');

    validator.checkNumberRange('fuelLevel', fuelLevelRange);
  }
}

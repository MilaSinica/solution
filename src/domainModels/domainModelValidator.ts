type RangeValidationOptions = {
  min?: number;
  max?: number;
};

export class DomainModelValidator<T> {
  constructor(private instance: T) {
    if (!instance) {
      throw new Error('DomainModelValidator: instance is required');
    }
  }

  public checkRequiredField(field: keyof T): void {
    if (this.instance[field] == undefined) {
      throw new Error(`"${field}" is required`);
    }
  }

  public checkNumberRange(field: keyof T, options: RangeValidationOptions): void {
    const value = this.instance[field];
    if (value == undefined) return;
    const valueAsNumber = (value as any) as number;

    if (!Number.isFinite(valueAsNumber)) {
      throw new Error(`expected ${field} to be a number`);
    }

    let isCorrect = true;
    if (options.min != undefined) {
      isCorrect = isCorrect && valueAsNumber >= options.min;
    }
    if (options.max != undefined) {
      isCorrect = isCorrect && valueAsNumber <= options.max;
    }

    if (!isCorrect) {
      throw new Error(`${field} is out of range`);
    }
  }
}

import { DomainModelValidator } from './domainModelValidator';

describe('domain model validator', () => {
  it('should throw error if instance is null', () => {
    expect(() => new DomainModelValidator(null)).toThrowError();
  });

  describe('check required field', () => {
    it('should pass check', () => {
      const object = {
        prop: 'value',
      };
      const validator = new DomainModelValidator(object);
      validator.checkRequiredField('prop');
    });

    it('should pass check if value is false', () => {
      const object = {
        prop: false,
      };
      const validator = new DomainModelValidator(object);
      validator.checkRequiredField('prop');
    });

    it('should pass check if value is 0', () => {
      const object = {
        prop: 0,
      };
      const validator = new DomainModelValidator(object);
      validator.checkRequiredField('prop');
    });

    it('should throw error if value is null', () => {
      const object = {
        prop: null,
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkRequiredField('prop')).toThrowError();
    });

    it('should throw error if field is not defined', () => {
      const object = {
        prop: undefined,
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkRequiredField('prop')).toThrowError();
    });
  });

  describe('check range', () => {
    it('should throw error if value is string', () => {
      const object = {
        prop: '123',
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkNumberRange('prop', {})).toThrowError();
    });

    it('should throw error if value is boolean', () => {
      const object = {
        prop: true,
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkNumberRange('prop', {})).toThrowError();
    });

    it('should pass empty check', () => {
      const object = {
        prop: 1,
      };
      const validator = new DomainModelValidator(object);
      validator.checkNumberRange('prop', {});
    });

    it('should pass check', () => {
      const object = {
        prop: 1.5,
      };
      const validator = new DomainModelValidator(object);
      validator.checkNumberRange('prop', { min: 1, max: 2 });
    });

    it("shouldn't pass min check", () => {
      const object = {
        prop: -1,
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkNumberRange('prop', { min: 0 })).toThrowError();
    });

    it("shouldn't pass max check", () => {
      const object = {
        prop: 1,
      };
      const validator = new DomainModelValidator(object);
      expect(() => validator.checkNumberRange('prop', { max: 0 })).toThrowError();
    });
  });
});

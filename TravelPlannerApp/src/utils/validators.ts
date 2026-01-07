export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  isNumber: (value: string): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
  },

  isPositiveNumber: (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  },

  isValidDate: (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  },

  isDateInFuture: (date: Date): boolean => {
    return date > new Date();
  },

  isValidDateRange: (startDate: Date, endDate: Date): boolean => {
    return validators.isValidDate(startDate) &&
      validators.isValidDate(endDate) &&
      endDate >= startDate;
  },
};
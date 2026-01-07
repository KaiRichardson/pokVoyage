import { format, differenceInDays, parseISO, addDays } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const getTripDuration = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate) + 1;
};

export const isUpcoming = (date: Date): boolean => {
  return date > new Date();
};

export const isPast = (date: Date): boolean => {
  return date < new Date();
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};
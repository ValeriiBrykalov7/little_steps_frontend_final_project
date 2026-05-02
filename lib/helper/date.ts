const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

interface DateRangeOptions {
  minOffset?: number;
  maxOffset?: number;
}

export const getDateRange = ({
  minOffset = 0,
  maxOffset = 280,
}: DateRangeOptions = {}) => {
  if (minOffset > maxOffset) {
    throw new Error('minOffset cannot be greater than maxOffset');
  }

  const today = startOfDay(new Date());

  return {
    min: addDays(today, minOffset),
    max: addDays(today, maxOffset),
  };
};

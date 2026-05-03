export const FIRST_WEEK = 1;
export const LAST_WEEK = 40;

// Ця функція приводить будь-яке число до діапазону від 1 до 40
export const optimizeWeek = (week: number) => {
  if (!Number.isFinite(week)) return FIRST_WEEK;
  return Math.min(Math.max(week, FIRST_WEEK), LAST_WEEK);
};

// Для того щоб не показувати помилку при введенні в URL
// рандомного значення(рядка якогось або числа більше 40)
export const getActiveWeek = (
  currentWeekFromServer: number,
  selectedWeek?: number,
) => {
  const currentWeek = optimizeWeek(currentWeekFromServer);

  const requestedWeek =
    selectedWeek === undefined || !Number.isFinite(selectedWeek)
      ? currentWeek
      : optimizeWeek(selectedWeek);

  return Math.min(requestedWeek, currentWeek);
};

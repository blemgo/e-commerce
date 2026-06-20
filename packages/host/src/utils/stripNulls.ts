export const stripNulls = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> => {
  const objectEntries = Object.entries(obj);

  const entriesWithValues = objectEntries.filter(
    ([, value]) => value !== null,
  );

  return Object.fromEntries(entriesWithValues) as Partial<T>;
};
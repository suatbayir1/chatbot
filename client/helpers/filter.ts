export const filterByKeyValue = (
  data: any[],
  property: string,
  value: string
): any[] => {
  const filtered = data.filter((item) =>
    item[property].toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );
  return filtered;
};

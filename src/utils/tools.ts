function arrayToObjectArrayConverter(array: any[], key: string): any[] {
  const result = array ? array.map((value) => ({ [key]: value })) : [];
  return result;
}

export { arrayToObjectArrayConverter };

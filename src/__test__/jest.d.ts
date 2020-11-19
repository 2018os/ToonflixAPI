export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOdd(x: number): R;
      toObjectContain(properties: any[]): R; // TODO: Rename: Object containing at least one in properties
    }
  }
}

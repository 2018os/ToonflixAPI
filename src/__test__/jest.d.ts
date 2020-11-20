export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toIncludeObjects(properties: any[]): R;
    }
  }
}

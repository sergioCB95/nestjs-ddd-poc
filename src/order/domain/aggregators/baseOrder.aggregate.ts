export interface BaseOrder<T> {
  id: string;
  items: Array<T>;
}

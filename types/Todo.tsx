export enum TodoStorage {
  TODO = 'todoList',
}

export interface Todo<T> {
  id: T,
  text: string,
  working: string,
  complete: boolean
}
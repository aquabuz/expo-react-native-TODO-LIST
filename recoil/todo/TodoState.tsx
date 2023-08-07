import { atom, atomFamily } from 'recoil';
import { Todo } from '../../types/Todo';

export const todoListState = atom<Todo<number>[]>({
  key: 'todoListState',
  default: [],
});

export const todoListItemState = atomFamily<Todo<number>>({
  key: 'todoListItemState',
  default: {
    id: null,
    text: '',
    working: ''
  }
});

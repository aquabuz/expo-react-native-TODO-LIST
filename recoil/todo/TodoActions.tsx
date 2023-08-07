// TodoActions.js

import { atom, atomFamily, useRecoilCallback, selector, selectorFamily } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todoListState } from './TodoState';
import { TodoStorage, Todo } from '../../types/Todo';

export const addTodo = atomFamily({
  key: 'addTodo',
  default: '',
});

export const removeTodo = atomFamily({
  key: 'removeTodo',
  default: '',
});

async function updateStorage(updatedTodoList: Todo<number>[], storage: string) {
  try {
    await AsyncStorage.setItem(storage, JSON.stringify(updatedTodoList));
    console.log(updatedTodoList);
  } catch(error) {
    console.log(error);
  }
}

function updateTodo(todo, currentTodoList) {
  let { id, text, working, setTodo, complete, storage } = todo;
  let _updatedTodoList = [];
    
  switch (setTodo) {
    case 'delete':
      _updatedTodoList = [ ...currentTodoList ].filter(todo => todo.id !== id);
      break;
    case 'add':
      _updatedTodoList = [ ...currentTodoList, { id, text, working, complete } ];
      break;
    case 'complete':
      _updatedTodoList = [ ...currentTodoList ].map(todo => {                            
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          }
        }
        
        return todo;
      });
      break;
  }

  updateStorage(_updatedTodoList, storage);
  
  return _updatedTodoList;
}

export const useSetTodo = selector({
  key: 'useSetTodo',
  get: ({ get }) => {
    const todoList = get(todoListState);
    return todoList;
  },  
  set: ({ get, set }, todo) => {
    const currentTodoList = get(todoListState);
    const updatedTodoList = updateTodo(todo, currentTodoList);
    
    set(todoListState, updatedTodoList);
  }
});

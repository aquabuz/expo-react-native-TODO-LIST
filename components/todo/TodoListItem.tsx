import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import theme from '../../styles/theme/colors';
import { todoListState } from '../../recoil/todo/TodoState';
import { useSetTodo } from '../../recoil/todo/TodoActions';
import { TodoStorage, Todo } from '../../types/Todo';
import { GlobalAlert } from '../common/GlobalAlert'

const ToDoListItem = ({ item }: Todo) => {
  const todoList = useRecoilValue(todoListState)
  const setTodo = useSetRecoilState(useSetTodo);
  
  const handleSetComplete: (id: number) => void = (id: number) => {
    const todo = {
      id,
      setTodo: 'complete',
      storage: TodoStorage.TODO
    };
    
    setTodo(todo);
  }
  
  const handleSetRemove: (id: number) => void = (id: number) => {
    GlobalAlert({
      title: '삭제하시겠습니까?',
      desc: '돌이킬 수 없습니다',
      buttons: [
        {
          text: '',
          style: 'cancel'          
        },
        {
          text: '',
          style: 'destructive',
          onPress: () => {
            const todo = { id, setTodo: 'delete', storage: TodoStorage.TODO };
            setTodo(todo);
          }
        }
      ]
    });
  }
  
  return (
    <View style={styles.toDo}>
      <TouchableOpacity onPress={() => handleSetComplete(item.id)}>
        <Foundation name="check" size={24} color={ item?.complete ? 'green' : 'red' } />
      </TouchableOpacity>
      <Text style={styles.toDoText}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => handleSetRemove(item.id)}>
        <FontAwesome name="trash-o" size={18} color={theme.grey} />
      </TouchableOpacity>
    </View> 
  )
};

export default ToDoListItem;

const styles = StyleSheet.create({
  toDo: {
    padding: 20,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.grey2,
  },
  toDoText: {
    paddingHorizontal: 20,
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  }
})
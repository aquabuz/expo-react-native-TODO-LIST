// TodoList.js

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../../styles/theme/colors";
import { todoListState } from '../../recoil/todo/TodoState';
import { currentTab } from '../../recoil/todo/TodoTabs';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const [ working, setWorking ] = useRecoilState(currentTab);  
  
  const renderItem = ({ item }) => (
    item?.working === working ? <TodoListItem item={item} /> : null
  );
  
  useEffect(() => {
    const fetchTodoList = async () => {
      //return AsyncStorage.clear();
      const storedTodoList = await AsyncStorage.getItem('todoList');
      if (storedTodoList) {
        setTodoList(JSON.parse(storedTodoList));
      }
    };
    fetchTodoList();
    console.log('list', todoList) 
  }, []);
  
  return (
    <View style={styles.contents}>
      <FlatList
        data={todoList}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  contents: {
    paddingVertical: 40,
  },
  toDoList: {
    paddingBottom: 200,
  }
});
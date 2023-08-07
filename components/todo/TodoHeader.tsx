// AddTodoForm.js

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, ScrollView } from "react-native";
import { useRecoilState, useSetRecoilState } from 'recoil';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import theme from "../../styles/theme/colors";
import { todoListItemState } from '../../recoil/todo/TodoState';
import { currentTab } from '../../recoil/todo/TodoTabs';
import { useSetTodo } from '../../recoil/todo/TodoActions';
import { TodoStorage, Todo } from '../../types/Todo';

const TodoHeader = () => {
  const [ working, setWorking ] = useRecoilState(currentTab);
  const [ todoText, setTodoText ] = useRecoilState(todoListItemState(''));
  
  const travel = () => setWorking('travel');
  const work = () => setWorking('work');
  
  const setTodo = useSetRecoilState(useSetTodo);
  
  const handleSetAdd: () => void = (id: number) => {
    if (todoText.trim()) {
      const todo = {
        id: Date.now(),
        text: todoText.trim(),
        working,
        complete: false,
        setTodo: 'add',
        storage: TodoStorage.TODO
      };
      
      console.log('header', todo)
      
      setTodoText('');
      setTodo(todo);
    }
  }
  
  useEffect(() => {
    setWorking('work');
  }, []);
  
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={work} style={styles.btnWrap}>
          <Text
            style={{ ...styles.btnText, color: working === 'work' ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel} style={styles.btnWrap}>
          <Text
            style={{
              ...styles.btnText,
              color: working === 'travel' ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={handleSetAdd}
        returnKeyType="done"
        onChangeText={setTodoText}
        value={todoText}
        placeholder={
          working ? "What do you have to do?" : "Where do you want to go?"
        }
        style={styles.input}
      />
    </>
  );
};

export default TodoHeader;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnWrap: {
    flex: 1,
  },
  btnText: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
  },
});
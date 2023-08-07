 import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import theme from '../../styles/theme/colors';
import { currentTab } from '../../recoil/todo/TodoTabs';


export default function ToDoMain() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <TodoHeader />
        <TodoList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
})

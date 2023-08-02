import React from 'react';
import { Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import TodoMain from './components/todo/TodoMain';

export default function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <TodoMain />
      </React.Suspense>
    </RecoilRoot>
  );
}
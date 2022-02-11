import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TypingTest from './components/TypingTest';
import store from './redux/redux';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <TypingTest />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

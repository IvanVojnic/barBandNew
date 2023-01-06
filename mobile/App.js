import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigation';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
//import registerNNPushToken from "native-notify";
///global.__reanimatedWorkletInit = () => {};
export default function App() {
  //registerNNPushToken(5590, 'uXdMYod5Am9EVK7Vc7hoGl')
  return (
      <MainStack/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native';
import OnboardingScreen from './components/Onboarding';
// import Home from './components/Home';
export default function App() {
  return (
    <View style = {style.container}>
      <StatusBar barStyle="light-content"/>
      <OnboardingScreen/>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#03001C',
  },
});

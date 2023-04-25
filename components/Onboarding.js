import React, { useState } from 'react';
import {View , StyleSheet ,ImageBackground, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Login from './Login';
import Register from './Register';
import About from './About';
import Home from './Home';
import StartRecording from './record';
// import Profile from './profile';

const slides = [
    {
      key: 1,
      title: 'MUSICAL AID',
      text: 'Description.\nSay something cool',
      image: require('../assets/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'ABOUT',
      text: 'Other cool stuff',
      image: require('../assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'WELCOME',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../assets/4.jpeg'),
      backgroundColor: '#22bcb5',
    }
];

export default function OnboardingScreen() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [screen, setScreen] = useState("Register");
  const _renderItem = ({ item,index }) => {
    return (
      <ImageBackground source={require("../assets/bg2.jpg")} style={styles.bgImg}>
         <View style={[styles.slide]}>
           <Text style={styles.title}>{item.title}</Text>
           <Image source={item.image} style={styles.image} />
           <Text style={styles.text}>{item.text}</Text>
         </View>
      </ImageBackground>
    );
  }
  const _onDone = () => {
    setShowRealApp(true)
  }
  if (showRealApp) {
    if (screen === "Register") {
      return <Register setScreen={(text) => setScreen(text)} />;
    } else if (screen === "Login") {
      return <Login setScreen={(text) => setScreen(text)} />
    }else if(screen==="About"){
      return <About setScreen={(text) => setScreen(text)} />
    }else if(screen==="Home"){
      return <Home setScreen={(text) => setScreen(text)} />
    }else if(screen==="StartRecording"){
      return <StartRecording setScreen={(text) => setScreen(text)} />
    }
  } else {
    return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />;
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    color: "white"
  },
  text: {
    fontSize: 20,
    color: "#000"
  },
  image: {
    margin: 10,
    width: "70%",
    height: "50%",
    borderRadius: 50
  },
  bgImg: {
    width: "100%",
    height: "100%"
  }

})
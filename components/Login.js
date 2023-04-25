import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth} from './auth';
export default function Login({setScreen}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Login success, Welcome");
        setScreen("Home");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.bgImg}>
      <Text style={styles.title}>Log In to your Account</Text>
      <Icon name="person-circle" size={100} color="white" />
      <View style={styles.inputs}>
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          placeholderTextColor="white"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={signin}>
        <Text style={styles.login}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.create} onPress={() => setScreen('Register')}>
        Create a new account
      </Text>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  input: {
    elevation: 1,
    borderRadius: 100,
    padding: 10,
    margin: 10,
    width: 350,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'grey',
  },
  login: {
    elevation: 1,
    borderRadius: 100,
    padding: 10,
    margin: 10,
    width: 350,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'lightgreen',
    color: 'darkblue',
  },
  create: {
    fontSize: 20,
    color: 'grey',
    margin: 10,
  },
  inputs: {
    margin: 30,
  },
});

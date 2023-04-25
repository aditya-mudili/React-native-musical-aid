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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './auth';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register({setScreen}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const signup = () => { 
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        Alert.alert('Registered successfully');
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
      <Text style={styles.title}>Create Account</Text>
      <Icon name="person-circle" size={100} color="#fff" />
      <View style={styles.inputs}>
        <TextInput
          placeholder="Email"
          onChangeText={(text)=> setEmail(text)}
          placeholderTextColor="white"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={(text)=> setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={signup}>
        <Text style={styles.login}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.create} onPress={() => setScreen('Login')}>
        Already Have An Account?? Login
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
    fontSize: 40,
    color: 'white',
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

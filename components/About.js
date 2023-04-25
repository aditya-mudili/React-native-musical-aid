import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity,} from 'react-native';

export default function About({ setScreen }) {
    return (
        <View>
        <Image source={require("../assets/3.png")} style={styles.Img}></Image>
        <Text style={styles.title}>Create Music with your own tunes and play</Text>
        <Text>
            Musical Aid uses advanced AI method to suggest tunes based on the facial emotion of the user. It enlightens their emotions and make them feel better.
        </Text>
      <TouchableOpacity onPress={() => setScreen("Home")}>
        <Text>Log in</Text>
      </TouchableOpacity>
      {/* <Text style={styles.create} onPress={() => setScreen("Register")}>create</Text> */}
      </View>
    )
}
const styles = StyleSheet.create({
    Img: {
      alignItems: "center",
      width: "100%",
      height: "50%"
    },
    title: {
      fontSize: 30,
      color: "Black"
    },
  })
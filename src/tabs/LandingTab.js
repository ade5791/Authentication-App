
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingTab() {
  const [counter, setCounter] = React.useState(0);

  const AddCounter = () => {
    setCounter(counter + 1);

  }

  const SubCounter = () => {
    setCounter(counter - 1);

  }
  return (
    <View style={styles.container}>
   	<TouchableOpacity style={styles.button} onPress={() => AddCounter()}>
					<Text style={styles.textButton}>
						Add
					</Text>
				</TouchableOpacity>
      <Text>This is your test counter app : {counter}</Text>
    	<TouchableOpacity style={styles.button} onPress={() => SubCounter()}>
					<Text style={styles.textButton}>
						Subtract
					</Text>
				</TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center'
  },
  title: {

  },
  logo: {
      flex: 1,
      height: 120,
      width: 90,
      alignSelf: "center",
      margin: 30
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16
  },
  button: {
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },
  footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
})
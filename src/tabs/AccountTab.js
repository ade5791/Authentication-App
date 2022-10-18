import React, { useEffect, useState } from 'react'
import { View, Alert, Text, TouchableOpacity, StyleSheet, Button, ScrollView, TextInput, Pressable, Fragment } from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import firebase from "firebase";

import { useNavigation } from "@react-navigation/native";

const date = new Date();
const year = date.getFullYear();

export default function AccountTab (){

	const [user, setUser] = useState("")
	const [editmode, setEditmode] = useState(false)
	const [usernameInput, setUsernameInput] = useState("")
	const navigation = useNavigation();

	useEffect(() => {
		setUser(firebase.auth().currentUser)
	}, [])



	const signOut = () => {
		Alert.alert(
			"Sign Out",
			"Are you sure you want to sign out?",
			[
				{	
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{																									
					text: "Sign Out",
					onPress: () => {
						firebase.auth().signOut().then(() => {	
				  navigation.navigate("Login")
	}).catch((error) => {
		console.log(error)
	});
}	
	}
	],
	{ cancelable: true }
	);
	}

	// webview set to trigger webbrowser
	const [terms, setTerms] = useState(null);
	const _gotoTerms = async () => {
	    let terms = await WebBrowser.openBrowserAsync('');
	    setTerms(terms);
  	}

  	const [policy, setPolicy] = useState(null);
	const _gotoPolicy = async () => {
	    let policy = await WebBrowser.openBrowserAsync('');
	    setPolicy(policy);
  	}

  	const showUser = () => {
  		return <Text style={styles.text}>{user.displayName ? user.displayName : "If you'd like to set a display name you can do so below."}</Text>
  	}

  	const editUser = () => {
  		return <TextInput style={[styles.text, {opacity: 1, color: '#FFF'}]}
  				 placeholder={user.displayName ? "set your display name here" : "set your display name here"}
  				 placeholderTextColor='#FFF'
  				 onChangeText={(text) => setUsernameInput(text)}
  			/>
  	}

  	const changePassword = () => {
  		firebase.auth().sendPasswordResetEmail(user.email);
  		alert('Please check your email to finish resetting your password.');
  	}

  	const changeUsername = () => {
  		user.updateProfile({
  			displayName: usernameInput
  		}).then((user) => {
  			setEditmode(false)
  		}).catch((error) => {
  			console.log(error)
  		})
  	}

  	const changeUsernameButton = () => {
  		return <TouchableOpacity style={styles.button} onPress={() => setEditmode(true)}>
					<Text style={styles.textButton}>
						{user.displayName ? "Change username" : "Set Username"}
					</Text>
				</TouchableOpacity>	
  	}

  	const editUsernameButtons = () => {
  		return <View style={styles.edit}>
  			<TouchableOpacity style={[styles.two, styles.marRight]} onPress={() => changeUsername()}>
				<Text style={styles.textTwo}>
					Confirm
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.two, styles.marLeft]} onPress={() => setEditmode(false)}>
				<Text style={styles.textTwo}>
					Cancel
				</Text>
			</TouchableOpacity>
		</View>
  	}		

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.info}>
					<Text style={styles.hi}>{user.displayName ? `Hello, ${user.displayName}` : "Hello!"}</Text>
				
					<View style={styles.nameRow}>
						{editmode ? editUser() : showUser()}
					</View>
					<View style={styles.emailRow}>
						<Text style={styles.title}>Email</Text>
						<Text style={styles.text}>{user.email}</Text>
					</View>	
					{/*<View>				
						<Text style={styles.emailVer}>{user.emailVerified ? null : "You haven't verified your email yet."}</Text>
					</View>*/}
				</View>
				{editmode ? editUsernameButtons() : changeUsernameButton()}
				<TouchableOpacity 
	             onPress={() => navigation.navigate("SubscribeScreen")}
				   style={styles.button}>
					<Text style={styles.textButton}>
						Manage Subscription
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => changePassword()}>
					<Text style={styles.textButton}>
						Change Password
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={signOut} >
					<Text style={styles.textButton}>
						Log Out
					</Text>
				</TouchableOpacity>
				<View style={styles.termsPolicies}>
					<TouchableOpacity style={[styles.two, styles.marRight]} onPress={_gotoTerms}>
						<Text style={styles.textTwo}>
							Terms
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.two, styles.marLeft]} onPress={_gotoPolicy}>
						<Text style={styles.textTwo}>
							Policy
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.end}> 
					<Text style={styles.byWho}>
						{'\u00A9'} {year} test app
					</Text>
				</View>
			</ScrollView>
		</View>
	)
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
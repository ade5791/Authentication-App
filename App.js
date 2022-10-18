import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { Firebase } from "./src/firebase/config";
import { SafeAreaProvider } from "react-native-safe-area-context";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  console.log(loading);
  if (loading) {
    return <></>;
  }

  useEffect(() => {
    const usersRef = Firebase.firestore().collection("users");
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
 
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => <HomeScreen {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

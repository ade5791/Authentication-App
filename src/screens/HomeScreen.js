import React, { useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountTab from "../tabs/AccountTab";

import LandingTab from "../tabs/LandingTab";
import Playground3 from "../tabs/Playground3";
import Playground2 from "../tabs/Playground2";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Playground 1" component={LandingTab} />
      <Tab.Screen name="Playground 2" component={Playground2} />
      <Tab.Screen name="Playground 3" component={Playground3} />

      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

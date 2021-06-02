import React from "react";
import { View } from "react-native";
import { Authentication } from "./features/authentication/Authentication";
import { ResetPassword } from "./features/authentication/ResetPassword/ResetPassword";
import { User } from "./features/authentication/User";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Splash } from "./features/splash/Splash";
import { Home } from "./features/home/Home";
import { Survey } from "./features/userSurvey/Survey";
import { CalorieGoal } from "./features/userSurvey/goals/calorieGoal/CalorieGoal";
import { AddFood } from "./features/addFoods/AddFood";
import { FoodModal } from "./features/addFoods/FoodModal";
import { Settings } from "./features/settings/Settings";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "react-native-vector-icons";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="Splash">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Authentication"
        component={Authentication}
      ></MainStack.Screen>
      <MainStack.Screen name="Settings" component={Settings}></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="CalorieGoal"
        component={CalorieGoal}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Survey"
        component={Survey}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      ></MainStack.Screen>
      <MainStack.Screen name="User" component={User}></MainStack.Screen>
      <MainStack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerStyle: {
            backgroundColor: "#003f5c",
          },
          headerTintColor: "white",
          headerLeft: () => null,
        }}
      ></MainStack.Screen>
      <MainStack.Screen
        name="AddItem"
        component={AddFood}
        options={{
          headerStyle: {
            backgroundColor: "#003f5c",
          },
          headerTintColor: "white",
          headerLeft: () => null,
        }}
      ></MainStack.Screen>
      <MainStack.Screen
        name="ResetPassword"
        options={{
          headerStyle: {
            backgroundColor: "#003f5c",
          },
          headerTintColor: "white",
        }}
        component={ResetPassword}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
}

export function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="FoodModal"
        component={FoodModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#3e2465"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Eat"
        component={AddFood}
        options={{
          tabBarLabel: "Eat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootStackScreen></RootStackScreen>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 320,
  },
});

export default App;

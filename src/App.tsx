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

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="AddItem">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Authentication"
        component={Authentication}
      ></MainStack.Screen>
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
        component={Home}
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

function RootStackScreen() {
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

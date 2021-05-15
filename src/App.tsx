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

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Survey">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Authentication"
            component={Authentication}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="CalorieGoal"
            component={CalorieGoal}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Survey"
            component={Survey}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Splash"
            component={Splash}
          ></Stack.Screen>
          <Stack.Screen name="User" component={User}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen
            name="ResetPassword"
            options={{
              headerStyle: {
                backgroundColor: "#003f5c",
              },
              headerTintColor: "white",
            }}
            component={ResetPassword}
          ></Stack.Screen>
        </Stack.Navigator>
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

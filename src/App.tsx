import React from "react";
import { View } from "react-native";
import { Authentication } from "./features/authentication/Authentication";
import { ResetPassword } from "./features/authentication/ResetPassword/ResetPassword";
import { User } from "./features/authentication/User";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authentication">
          <Stack.Screen
            options={{ headerShown: false }}
            name="authentication"
            component={Authentication}
          ></Stack.Screen>
          <Stack.Screen name="user" component={User}></Stack.Screen>
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
  },
});

export default App;

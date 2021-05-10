import React from "react";
import { View } from "react-native";
import { Authentication } from "./features/authentication/Authentication";
import { User } from "./features/authentication/User"
import { StyleSheet } from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <User></User>
      <Authentication></Authentication>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;

import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { selectLoggedInUser } from "../authentication/userSlice";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export function Splash({ navigation }) {
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user.user) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Authentication");
    }
  }),
    [user];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#003f5c",
    },
    loadingIndicator: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
      marginTop: "20%",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My Nutrition</Text>
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color={"#000000"} size="large" />
      </View>
    </View>
  );
}

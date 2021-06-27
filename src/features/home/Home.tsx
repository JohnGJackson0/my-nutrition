import React from "react";
import { View, StyleSheet } from "react-native";
import { CalorieLogPerDay } from "../calorieLog/calorieLogPerDay";

export function Home({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
    },
  });

  return (
    <View style={styles.container}>
      <CalorieLogPerDay navigation={navigation}></CalorieLogPerDay>
    </View>
  );
}

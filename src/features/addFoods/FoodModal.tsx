import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Theme } from "src/Theme";
import { selectFood } from "./foodSlice";
import { useSelector } from "react-redux";

export function FoodModal({ navigation }) {
  const food = useSelector(selectFood);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.themedBackgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {console.log(food)}
      <Theme.themedText>{food.food.foodName}</Theme.themedText>

      <Theme.themedButton onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

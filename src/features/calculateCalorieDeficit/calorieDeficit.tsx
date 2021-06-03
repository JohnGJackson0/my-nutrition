import React from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "src/Theme";

export function Home({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
    },
  });

  //TODO: consumed/remaining fats/carbs/protiens calories
  return (
    <View style={styles.container}>
      <Theme.themedCoolText>
        The calulation of calorie deficit.
      </Theme.themedCoolText>
    </View>
  );
}

import React from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "src/Theme";

export function Settings({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
    },
  });

  return (
    <View style={styles.container}>
      <Theme.themedText> Welcome to Settings </Theme.themedText>
    </View>
  );
}

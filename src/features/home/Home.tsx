import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../authentication/User";

export function Home({ navigation }) {
  const styles = StyleSheet.create({});

  return (
    <View>
      <User></User>
      <Text>Welcome to the home screen.</Text>
    </View>
  );
}

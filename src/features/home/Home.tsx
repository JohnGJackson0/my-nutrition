import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
import {
  selectUserInfo,
  getGoalAsync,
} from "../userSurvey/questions/UserInfoSlice";
import { FAB } from "react-native-paper";

export function Home({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoalAsync);
  }, []);

  const userInfo = useSelector(selectUserInfo);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: "#fb5b5a",
    },
  });

  //TODO: consumed/remaining fats/carbs/protiens calories
  return (
    <View style={styles.container}>
      <Theme.themedText>Welcome to the home screen. </Theme.themedText>
    </View>
  );
}

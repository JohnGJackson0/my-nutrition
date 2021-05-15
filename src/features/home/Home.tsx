import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
import { User } from "../authentication/User";
import {
  selectUserInfo,
  getGoalAsync,
} from "../userSurvey/questions/UserInfoSlice";

export function Home({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoalAsync);
  }, []);

  const userInfo = useSelector(selectUserInfo);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {userInfo.calorieGoalError != "" ? (
        <View>
          <Theme.themedErrorText>
            There was an issue with your most recent calorie submission.
          </Theme.themedErrorText>
          <Theme.themedErrorText>
            {userInfo.calorieGoalError}
            {console.log(userInfo)}
          </Theme.themedErrorText>
        </View>
      ) : (
        <View>
          <User></User>
          <Text>Welcome to the home screen.</Text>
        </View>
      )}
    </View>
  );
}

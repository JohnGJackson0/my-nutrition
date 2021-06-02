import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
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
      backgroundColor: "#003f5c",
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: "#fb5b5a",
    },
    goalButton: {
      margin: 10,
    },
    homeContainer: {
      alignItems: "center",
    },
  });

  //TODO: consumed/remaining fats/carbs/protiens calories
  return (
    <View style={styles.container}>
      {console.log(userInfo)}
      {userInfo.calorieGoal == null ? (
        <View>
          <Theme.themedButtonRounded
            styles={styles.goalButton}
            onPress={() => navigation.navigate("Survey")}
            title="Let's set a goal"
          ></Theme.themedButtonRounded>
        </View>
      ) : (
        <View style={styles.homeContainer}>
          <Theme.themedText> My calorie goal </Theme.themedText>
          <Theme.themedCoolText> {userInfo.calorieGoal} </Theme.themedCoolText>
        </View>
      )}
    </View>
  );
}

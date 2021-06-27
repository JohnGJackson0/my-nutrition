import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, signOut } from "../authentication/userSlice";
import { Theme } from "src/Theme";
import {
  selectUserInfo,
  getGoalAsync,
} from "../userSurvey/questions/UserInfoSlice";
import { getFoodLogsAsync, selectFoods } from "./FoodsLogSlice";
import { FoodLogState } from "../AccountAPI";
import { EntryLog } from "./EntryLog";

export function CalorieLogPerDay({ navigation }) {
  const userInfo = useSelector(selectUserInfo);
  const [calorieGoal, setCalorieGoal] = useState(
    useSelector(selectUserInfo).calorieGoal
  );
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const foods = useSelector(selectFoods);

  function renderFoodLog() {
    const items = [];

    const logs = foods.foodLogs.map((item: any) => {
      items.push(<EntryLog foodState={item}></EntryLog>);
    });

    return items;
  }

  useEffect(() => {
    setCalorieGoal(userInfo.calorieGoal);
  }, [userInfo]);

  useEffect(() => {
    dispatch(getGoalAsync(user.user.uid));
    dispatch(getFoodLogsAsync(user.user.uid));
  }, []);

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
      {calorieGoal == null ? (
        <View>
          <Theme.themedButtonRounded
            styles={styles.goalButton}
            onPress={() => navigation.navigate("Survey")}
            title="Let's set a goal"
          ></Theme.themedButtonRounded>
        </View>
      ) : (
        <View>
          {foods.status == "loading" ? (
            <Theme.themedLoadingIndicator />
          ) : (
            <View style={styles.homeContainer}>
              <Theme.themedText>My calorie goal</Theme.themedText>
              <Theme.themedCoolText> {calorieGoal} </Theme.themedCoolText>
              {renderFoodLog()}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

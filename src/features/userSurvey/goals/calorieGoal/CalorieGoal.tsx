import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../../Theme";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCaloriesToMaintainFromState } from "./CalculateCaloriesToMaintain";
import {
  getRecommendedMinDeficit,
  getRecommendedMaxSurplus,
  goalMessage,
} from "./CalculateCalorieGoal";
import { Slider } from "react-native-range-slider-expo";
import { submitGoalAsync } from "../../questions/UserInfoSlice";

export function CalorieGoal({ navigation }) {
  const dispatch = useDispatch();
  const caloriesNeededToMaintainWeight = getCaloriesToMaintainFromState();
  const [calorieGoal, setcalorieGoal] = useState(
    caloriesNeededToMaintainWeight
  );

  const onSubmit = () => {
    navigation.navigate("Home");
    dispatch(submitGoalAsync({ calorieGoal }));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: "5%",
      backgroundColor: "#003f5c",
    },
    contentContainer: {
      marginBottom: "5%",
    },
  });

  const handleCalorieGoal = (value: number) => {
    setcalorieGoal(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Theme.themedCoolText>Guess what?</Theme.themedCoolText>
        <Theme.themedText>
          To maintain your body weight, you should consume about
        </Theme.themedText>
        <Theme.themedCoolText>
          {getCaloriesToMaintainFromState()} calories per day.
        </Theme.themedCoolText>

        <Theme.themedText>
          If your goal is to change your weight we can take away or add
          calories.
        </Theme.themedText>
        <Theme.themedText>
          Please adjust the slider below to change weight or leave it the same
          and submit.
        </Theme.themedText>
        <View>
          <Slider
            min={getRecommendedMinDeficit(caloriesNeededToMaintainWeight)}
            max={getRecommendedMaxSurplus(caloriesNeededToMaintainWeight)}
            valueOnChange={(value) => handleCalorieGoal(value)}
            initialValue={caloriesNeededToMaintainWeight}
            step={5}
            rangeLabelsTextColor="white"
          ></Slider>
        </View>
        <Theme.themedText>My calorie intake is set to</Theme.themedText>
        <Theme.themedCoolText>{calorieGoal}</Theme.themedCoolText>
        <Theme.themedText>This mean I want to </Theme.themedText>
        <Theme.themedCoolText>
          {goalMessage(caloriesNeededToMaintainWeight, calorieGoal)}
        </Theme.themedCoolText>
      </View>
      <Theme.themedButtonRounded
        title="Submit"
        onPress={onSubmit}
      ></Theme.themedButtonRounded>
    </View>
  );
}

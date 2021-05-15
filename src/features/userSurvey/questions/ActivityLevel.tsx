import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Theme } from "src/Theme";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";
import { updateWeeklyActivity } from "./UserInfoSlice";

export function ActivityLevel() {
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);
  const dispatch = useDispatch();
  const [exercisePerWeek, setExercisePerWeek] = useState("");

  const handleExercisePerWeek = (exericePerWeek: string) => {
    setExercisePerWeek(exericePerWeek);
    dispatch(updateWeeklyActivity(exericePerWeek));
  };
  useEffect(() => {
    dispatch(updateWeeklyActivity(null));
    setExercisePerWeek("");
  }, [isMeasurementUSA]);

  return (
    <View>
      <Theme.themedText>
        How many times do you exercise or have strenous activity per week?
      </Theme.themedText>
      <Theme.themedInput
        placeholder="enter your weekly exercise amount"
        keyboardType="number-pad"
        numeric
        value={exercisePerWeek}
        onChangeText={(value: string) => handleExercisePerWeek(value)}
      ></Theme.themedInput>
    </View>
  );
}

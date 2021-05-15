import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../Theme";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";
import { updateWeightKm } from "./UserInfoInMetricSlice";
import { updateWeightLb } from "./UserInfoInUSSlice";

export function Weight() {
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const dispatch = useDispatch();
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);

  useEffect(() => {
    dispatch(updateWeightKm(null));
    setWeightKg("");
    dispatch(updateWeightLb(null));
    setWeightLb("");
  }, [isMeasurementUSA]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });

  const handleWeightKg = (weightKGInput: string) => {
    setWeightKg(weightKGInput);
    dispatch(updateWeightKm(weightKGInput));
  };

  const handleWeightLb = (weightLBInput: string) => {
    setWeightLb(weightLBInput);
    dispatch(updateWeightLb(weightLBInput));
  };

  return (
    <View style={styles.container}>
      <Theme.themedText>Weight</Theme.themedText>
      {isMeasurementUSA ? (
        <View>
          <Theme.themedInput
            placeholder="enter your weight in pounds"
            keyboardType="number-pad"
            numeric
            value={weightLb}
            onChangeText={(value: string) => handleWeightLb(value)}
          ></Theme.themedInput>
        </View>
      ) : (
        <View>
          <Theme.themedInput
            placeholder="enter your weight in kilo"
            keyboardType="number-pad"
            numeric
            value={weightKg}
            onChangeText={(value: string) => handleWeightKg(value)}
          ></Theme.themedInput>
        </View>
      )}
    </View>
  );
}

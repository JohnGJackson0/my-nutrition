import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../Theme";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";
import { updateWeightMetric } from "./UserInfoInMetricSlice";
import { updateWeightUS } from "./UserInfoInUSSlice";

export function Weight() {
  const [weightKG, setWeightKG] = useState("");
  const [weightLB, setWeightLB] = useState("");
  const dispatch = useDispatch();
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);

  useEffect(() => {
    dispatch(updateWeightMetric(null));
    setWeightKG("");
    dispatch(updateWeightUS(null));
    setWeightLB("");
  }, [isMeasurementUSA]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });

  const handleWeightKG = (weightKGInput: string) => {
    setWeightKG(weightKGInput);
    dispatch(updateWeightMetric(weightKGInput));
  };

  const handleWeightLB = (weightLBInput: string) => {
    setWeightLB(weightLBInput);
    dispatch(updateWeightUS(weightLBInput));
  };

  return (
    <View style={styles.container}>
      <Theme.themedText>Weight</Theme.themedText>
      {isMeasurementUSA ? (
        <View>
          <Theme.themedInput
            placeholder="lb"
            keyboardType="number-pad"
            numeric
            value={weightLB}
            onChangeText={(value: string) => handleWeightLB(value)}
          ></Theme.themedInput>
        </View>
      ) : (
        <View>
          <Theme.themedInput
            placeholder="kg"
            keyboardType="number-pad"
            numeric
            value={weightKG}
            onChangeText={(value: string) => handleWeightKG(value)}
          ></Theme.themedInput>
        </View>
      )}
    </View>
  );
}

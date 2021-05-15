import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../Theme";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";
import { updateHeightCm } from "./UserInfoInMetricSlice";
import { updateHeightFt, updateHeightIn } from "./UserInfoInUSSlice";

export function Height() {
  const dispatch = useDispatch();
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });

  useEffect(() => {
    dispatch(updateHeightCm(null));
    setHeightCm("");
    dispatch(updateHeightFt(null));
    setHeightFt("");
    dispatch(updateHeightIn(null));
    setHeightIn("");
  }, [isMeasurementUSA]);

  const handleHeightCm = (heightCmInput: string) => {
    setHeightCm(heightCmInput);
    dispatch(updateHeightCm(heightCmInput));
  };

  const handleHeightFt = (heightFtInput: string) => {
    setHeightFt(heightFtInput);
    dispatch(updateHeightFt(heightFtInput));
  };
  const handleHeightIn = (heightInInput: string) => {
    setHeightIn(heightInInput);
    dispatch(updateHeightIn(heightInInput));
  };

  return (
    <View style={styles.container}>
      {isMeasurementUSA ? (
        <View>
          <Theme.themedText>Height </Theme.themedText>
          <Theme.themedInput
            placeholder="enter your height in feet"
            keyboardType="number-pad"
            numeric
            value={heightFt}
            onChangeText={(value: string) => handleHeightFt(value)}
          ></Theme.themedInput>
          <Theme.themedInput
            placeholder="enter inches"
            keyboardType="number-pad"
            numeric
            value={heightIn}
            onChangeText={(value: string) => handleHeightIn(value)}
          ></Theme.themedInput>
        </View>
      ) : (
        <View>
          <Theme.themedText>Height</Theme.themedText>
          <Theme.themedInput
            placeholder="enter your height in cm"
            keyboardType="number-pad"
            numeric
            value={heightCm}
            onChangeText={(value: string) => handleHeightCm(value)}
          ></Theme.themedInput>
        </View>
      )}
    </View>
  );
}

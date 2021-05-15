import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../Theme";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAge } from "./UserInfoSlice";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";

export function Age() {
  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);

  useEffect(() => {
    dispatch(updateAge(null));
    setAge("");
  }, [isMeasurementUSA]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });

  const handleAge = (ageInput: string) => {
    setAge(ageInput);
    dispatch(updateAge(ageInput));
  };

  return (
    <View style={styles.container}>
      <Theme.themedText>Age</Theme.themedText>
      <Theme.themedInput
        placeholder="enter your age"
        keyboardType="number-pad"
        numeric
        value={age}
        onChangeText={(value: string) => handleAge(value)}
      ></Theme.themedInput>
    </View>
  );
}

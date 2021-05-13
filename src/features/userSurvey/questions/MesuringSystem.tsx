import React from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "../../../Theme";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsUSAMeasurement,
  setIsUSAMeasurement,
} from "./MeasuringSystemSlice";

export function MesuringSystem() {
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);
  const dispatch = useDispatch();

  const onMetricPressed = () => {
    dispatch(setIsUSAMeasurement(false));
  };

  const onUSPressed = () => {
    dispatch(setIsUSAMeasurement(true));
  };

  const styles = StyleSheet.create({
    measureContainer: {
      width: "100%",
      flexDirection: "row",
    },
    buttonContainer: {
      padding: 5,
      alignContent: "center",
    },
  });

  return (
    <View style={styles.measureContainer}>
      <Theme.themedText>Select Measuring system:</Theme.themedText>
      <View style={styles.buttonContainer}>
        {isMeasurementUSA ? (
          <Theme.themedButton
            onPress={onUSPressed}
            title="USA"
          ></Theme.themedButton>
        ) : (
          <Theme.inactiveButtonVariant
            title="USA"
            onPress={onUSPressed}
          ></Theme.inactiveButtonVariant>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {isMeasurementUSA == true ? (
          <Theme.inactiveButtonVariant
            title="Metric"
            onPress={onMetricPressed}
          ></Theme.inactiveButtonVariant>
        ) : (
          <Theme.themedButton
            title="Metric"
            onPress={onMetricPressed}
          ></Theme.themedButton>
        )}
      </View>
    </View>
  );
}

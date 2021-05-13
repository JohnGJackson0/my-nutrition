import { View, StyleSheet, Text } from "react-native";
import { Theme } from "../../../Theme";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsUSAMeasurement } from "./MeasuringSystemSlice";
import { updateHeightMetric } from "./UserInfoInMetricSlice";
import { updateHeightFT, updateHeightIN } from "./UserInfoInUSSlice";

export function Height() {
  const dispatch = useDispatch();
  const [heightCM, setHeightCM] = useState("");
  const [heightFT, setHeightFT] = useState("");
  const [heightIN, setHeightIN] = useState("");
  const isMeasurementUSA = useSelector(selectIsUSAMeasurement);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });

  useEffect(() => {
    dispatch(updateHeightMetric(null));
    setHeightCM("");
    dispatch(updateHeightFT(null));
    setHeightFT("");
    dispatch(updateHeightIN(null));
    setHeightIN("");
  }, [isMeasurementUSA]);

  const handleHeightCM = (heightCMInput: string) => {
    setHeightCM(heightCMInput);
    dispatch(updateHeightMetric(heightCMInput));
  };

  const handleHeightFT = (heightFTInput: string) => {
    setHeightFT(heightFTInput);
    dispatch(updateHeightFT(heightFTInput));
  };
  const handleHeightIN = (heightINInput: string) => {
    setHeightIN(heightINInput);
    dispatch(updateHeightIN(heightINInput));
  };

  return (
    <View style={styles.container}>
      {isMeasurementUSA ? (
        <View>
          <Theme.themedText>Height </Theme.themedText>
          <Theme.themedInput
            placeholder="ft"
            keyboardType="number-pad"
            numeric
            value={heightFT}
            onChangeText={(value: string) => handleHeightFT(value)}
          ></Theme.themedInput>
          <Theme.themedInput
            placeholder="in"
            keyboardType="number-pad"
            numeric
            value={heightIN}
            onChangeText={(value: string) => handleHeightIN(value)}
          ></Theme.themedInput>
        </View>
      ) : (
        <View>
          <Theme.themedText>Height</Theme.themedText>
          <Theme.themedInput
            placeholder="cm"
            keyboardType="number-pad"
            numeric
            value={heightCM}
            onChangeText={(value: string) => handleHeightCM(value)}
          ></Theme.themedInput>
        </View>
      )}
    </View>
  );
}

import { ThemeProvider } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Theme } from "../../../Theme";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateGender } from "./UserInfoSlice";

export function Gender() {
  const isMale = useSelector(selectUserInfo);
  const [isMaleButtonActive, setIsMaleButtonActive] = useState<boolean>(isMale);
  const dispatch = useDispatch();

  const onMalePressed = () => {
    setIsMaleButtonActive(true);
    dispatch(updateGender(true));
  };

  const onFemalePressed = () => {
    setIsMaleButtonActive(false);
    dispatch(updateGender(false));
  };

  const styles = StyleSheet.create({
    genderContainer: {
      width: "100%",
      flexDirection: "row",
    },
    buttonContainer: {
      width: "50%",
      alignSelf: "stretch",
      padding: 5,
      alignContent: "center",
    },
  });

  return (
    <View style={styles.genderContainer}>
      <View style={styles.buttonContainer}>
        {isMaleButtonActive ? (
          <Theme.inactiveButton
            title="Female"
            onPress={onFemalePressed}
          ></Theme.inactiveButton>
        ) : (
          <Theme.themedButton
            onPress={onFemalePressed}
            title="Female"
          ></Theme.themedButton>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {isMaleButtonActive ? (
          <Theme.themedButton
            title="Male"
            onPress={onMalePressed}
          ></Theme.themedButton>
        ) : (
          <Theme.inactiveButton
            title="Male"
            onPress={onMalePressed}
          ></Theme.inactiveButton>
        )}
      </View>
    </View>
  );
}

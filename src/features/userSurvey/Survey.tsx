import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Theme } from "src/Theme";
import { UserInfo } from "./UserInfo";
import { useSelector } from "react-redux";
import { selectIsUSAMeasurement } from "./questions/MeasuringSystemSlice";
import { selectUserInfo } from "./questions/UserInfoSlice";
import { selectUserInfoMetric } from "./questions/UserInfoInMetricSlice";
import { selectUserInfoUS } from "./questions/UserInfoInUSSlice";

export function Survey({ navigation }) {
  const userInfoMetric = useSelector(selectUserInfoMetric);
  const isUSAMeasurement = useSelector(selectIsUSAMeasurement);
  const userInfo = useSelector(selectUserInfo);
  const userInfoUS = useSelector(selectUserInfoUS);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessageUS, setErrorMessageUS] = useState("");
  const [errorMessageMetric, setErrorMessageMetric] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: "5%",
      backgroundColor: "#003f5c",
    },
    measuringSystem: {
      margin: "2%",
    },
    questionsContainer: {
      marginBottom: "5%",
    },
  });

  const onSubmit = () => {
    if (isUSAMeasurement) {
      const error =
        userInfoUS.weightError +
        "\n" +
        userInfoUS.heightErrorIn +
        "\n" +
        userInfoUS.heightErrorFt +
        "\n" +
        userInfo.ageError +
        "\n";
      if (error.trim() != "") {
        setDisplayError(true);
        setErrorMessageUS(error);
      } else {
        navigation.navigate("Home");
      }
    } else {
      const error =
        userInfoMetric.weightError +
        "\n" +
        userInfoMetric.heightInCMError +
        "\n" +
        userInfo.ageError +
        "\n";
      if (error.trim() != "") {
        setDisplayError(true);
        setErrorMessageMetric(error);
      } else {
        navigation.navigate("Home");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionsContainer}>
        <UserInfo></UserInfo>
      </View>
      <Theme.themedButtonRounded
        title="Next"
        onPress={onSubmit}
      ></Theme.themedButtonRounded>
      {isUSAMeasurement == true ? (
        <View>
          <Theme.themedErrorText>{errorMessageUS}</Theme.themedErrorText>
        </View>
      ) : (
        <View>
          <Theme.themedErrorText>{errorMessageMetric}</Theme.themedErrorText>
        </View>
      )}
    </View>
  );
}

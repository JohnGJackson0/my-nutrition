import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPasswordAsync,
  selectPasswordResetMessage,
} from "./PasswordResetSlice";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordResetMessage);

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const onSubmit = () => {
    dispatch(resetPasswordAsync(email));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
    },
    inputView: {
      backgroundColor: "#465881",
      borderRadius: 25,
      margin: 5,
      height: 40,
      width: "100%",
    },
    inputText: {
      height: 40,
      color: "white",
    },
    errorText: {
      color: "red",
      fontSize: 20,
    },
    text: {
      color: "white",
      fontSize: 20,
      marginTop: 30,
      marginBottom: 30,
    },
    resetEmailButton: {
      backgroundColor: "#fb5b5a",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      marginBottom: 10,
    },
    buttonView: {
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>My Nutrition</Text>
        <Text style={styles.text}>
          Please enter your email and press reset.
        </Text>
        <View style={styles.inputView}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Email"
            value={email}
            style={styles.inputText}
            leftIcon={<Icon name="email-outline" size={24} color="grey" />}
            onChangeText={handleChangeEmail}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            onPress={onSubmit}
            title="Reset email"
            type="clear"
            titleStyle={{ color: "white" }}
            style={styles.resetEmailButton}
          />
        </View>
        {passwordReset ? (
          <Text style={styles.errorText}>
            {"\n"}
            {passwordReset.passwordResetMessage}
          </Text>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

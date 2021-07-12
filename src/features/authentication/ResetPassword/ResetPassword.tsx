import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
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
    directionContainer: {
      marginTop: "5%",
      marginBottom: "5%",
    },
  });

  return (
    <Theme.themedBackgroundContainer>
      <Theme.themedLogo />
      <View style={styles.directionContainer}>
        <Theme.themedText>
          Please enter your email and press reset.
        </Theme.themedText>
      </View>
      <Theme.themedInput
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
      />
      <Theme.themedButtonRounded onPress={onSubmit} title="Reset email" />
      {passwordReset ? (
        <Theme.themedErrorText>
          {"\n"}
          {passwordReset.passwordResetMessage}
        </Theme.themedErrorText>
      ) : (
        <View></View>
      )}
    </Theme.themedBackgroundContainer>
  );
}

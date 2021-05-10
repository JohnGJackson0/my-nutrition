import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { useAppDispatch } from "../../app/hooks";
import { resetPasswordAsync, SignInAsync } from "./userSlice";
import { useAppSelector } from "../../app/hooks";
import { selectLoggedInUser } from "./userSlice";

export function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector(selectLoggedInUser);

  const onSubmit = () => {
    dispatch(SignInAsync({ email, password }));
  };

  const resetPassword = () => {
    dispatch(resetPasswordAsync(email));
  };

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleChangePassword = (password: string) => {
    setPassword(password);
  };

  return (
    <View>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
        leftIcon={<Icon name="email-outline" size={24} color="grey" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handleChangePassword}
        leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
      />
      <Button onPress={onSubmit} title="Sign In" type="solid" />
      <View>
        <Text onPress={resetPassword} style={{ color: "blue" }}>
          {"\n"}Forgot Password?
        </Text>
      </View>

      {user.message ? (
        <Text>
          {"\n"}Error: {user.message}
        </Text>
      ) : (
        <View></View>
      )}
    </View>
  );
}

import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";
import { SignInAsync } from "./userSlice";
import { selectLoggedInUser } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";

export function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user.user) {
      navigation.navigate("Home");
    }
  }, [user]);

  const onSubmit = () => {
    dispatch(SignInAsync({ email, password }));
  };
  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleChangePassword = (password: string) => {
    setPassword(password);
  };

  return (
    <View>
      <Theme.themedInput
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
        leftIcon={<Icon name="email-outline" size={24} color="grey" />}
      />
      <Theme.themedInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handleChangePassword}
        leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
      />
      <Theme.themedButtonRounded onPress={onSubmit} title="Sign In" />
      <View>
        <Theme.themedText onPress={() => navigation.navigate("ResetPassword")}>
          {"\n"}Forgot Password?
        </Theme.themedText>
      </View>

      {user.message ? (
        <Theme.themedErrorText>
          {"\n"}
          {user.message}
        </Theme.themedErrorText>
      ) : (
        <View></View>
      )}
    </View>
  );
}

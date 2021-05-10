import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { useAppDispatch } from "../../app/hooks";
import { signUpAsync } from "./userSlice";

export function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
    //dispatch(signUpAsync(new credential))}
  };

  return (
    <View>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        leftIcon={<Icon name="email-outline" size={24} color="grey" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
        leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
      />
      <Button onPress={onSubmit} title="Sign In" type="solid" />
    </View>
  );
}

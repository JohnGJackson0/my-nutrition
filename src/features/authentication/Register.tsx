import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "../../app/hooks";
import { signUpAsync } from "./userSlice";
import { useAppSelector } from "../../app/hooks";
import { selectLoggedInUser } from "./userSlice";

export function Register() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useAppSelector(selectLoggedInUser);

  const handleSubmit = () => {
    dispatch(signUpAsync({ firstName, lastName, email, password }));
  };

  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleChangePassword = (password: string) => {
    setPassword(password);
  };

  const handleChangeFirstName = (firstName: string) => {
    setFirstName(firstName);
  };

  const handleChangeLastName = (lastName: string) => {
    setLastName(lastName);
  };

  return (
    <View>
      <Input
        placeholder="First Name"
        value={firstName}
        onChangeText={handleChangeFirstName}
        onSubmitEditing={handleSubmit}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChangeText={handleChangeLastName}
        onSubmitEditing={handleSubmit}
      />
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email-outline" size={24} color="grey" />}
        value={email}
        onChangeText={handleChangeEmail}
        onSubmitEditing={handleSubmit}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handleChangePassword}
        onSubmitEditing={handleSubmit}
        leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
      />
      <Button title="Register" type="solid" onPress={handleSubmit} />

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

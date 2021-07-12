import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { signUpAsync } from "./userSlice";
import { selectLoggedInUser } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";

export function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user.user) {
      navigation.navigate("Home");
    }
  }, [user]);

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
      <Theme.themedInput
        placeholder="First Name"
        value={firstName}
        onChangeText={handleChangeFirstName}
        onSubmitEditing={handleSubmit}
      />
      <Theme.themedInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={handleChangeLastName}
        onSubmitEditing={handleSubmit}
      />
      <Theme.themedInput
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
        onSubmitEditing={handleSubmit}
      />
      <Theme.themedInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handleChangePassword}
        onSubmitEditing={handleSubmit}
      />

      <Theme.themedButtonRounded title="Register" onPress={handleSubmit} />

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

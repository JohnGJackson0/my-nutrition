import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  const styles = StyleSheet.create({
    registerButton: {
      backgroundColor: "#fb5b5a",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      marginBottom: 10,
    },
    inputView: {
      backgroundColor: "#465881",
      borderRadius: 25,
      margin: 5,
      height: 40,
      justifyContent: "center",
      padding: 5,
      paddingTop: 13,
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
  });
  return (
    <View>
      <View style={styles.inputView}>
        <Input
          placeholder="First Name"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          value={firstName}
          style={styles.inputText}
          onChangeText={handleChangeFirstName}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          placeholder="Last Name"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.inputText}
          value={lastName}
          onChangeText={handleChangeLastName}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          placeholder="Email"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          leftIcon={<Icon name="email-outline" size={24} color="grey" />}
          value={email}
          style={styles.inputText}
          onChangeText={handleChangeEmail}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          placeholder="Password"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          secureTextEntry={true}
          value={password}
          style={styles.inputText}
          onChangeText={handleChangePassword}
          onSubmitEditing={handleSubmit}
          leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
        />
      </View>

      <Button
        title="Register"
        type="clear"
        titleStyle={{ color: "white" }}
        style={styles.registerButton}
        onPress={handleSubmit}
      />

      {user.message ? (
        <Text style={styles.errorText}>
          {"\n"}
          {user.message}
        </Text>
      ) : (
        <View></View>
      )}
    </View>
  );
}

import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SignInAsync } from "./userSlice";
import { selectLoggedInUser } from "./userSlice";

export function Login({ navigation }) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector(selectLoggedInUser);

  const onSubmit = () => {
    dispatch(SignInAsync({ email, password }));
  };
  const handleChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleChangePassword = (password: string) => {
    setPassword(password);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loginButton: {
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
    inputViewOld: {
      backgroundColor: "#465881",
      borderRadius: 25,
      margin: 5,
      height: 40,
      justifyContent: "center",
      padding: 5,
      paddingTop: 15,
      width: "100%",
    },
    buttonView: {
      width: "100%",
    },
    inputText: {
      height: 40,
      color: "white",
    },
    reset: {
      color: "white",
      fontSize: 11,
    },
    errorText: {
      color: "red",
      fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Input
          placeholder="Email"
          value={email}
          style={styles.inputText}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={handleChangeEmail}
          leftIcon={<Icon name="email-outline" size={24} color="grey" />}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="Password"
          secureTextEntry
          style={styles.inputText}
          value={password}
          onChangeText={handleChangePassword}
          leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          onPress={onSubmit}
          title="Sign In"
          type="clear"
          titleStyle={{ color: "white" }}
          style={styles.loginButton}
        />
      </View>
      <View>
        <Text
          onPress={() => navigation.navigate("ResetPassword")}
          style={styles.reset}
        >
          {"\n"}Forgot Password?
        </Text>
      </View>

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

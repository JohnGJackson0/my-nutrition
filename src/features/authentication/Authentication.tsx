import React, { useState } from "react";
import { Button } from "react-native-elements";
import { View, StyleSheet, Text } from "react-native";
import { Register } from "./Register";
import { Login } from "./Login";
import { selectLoggedInUser } from "./userSlice";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export function Authentication({ navigation }) {
  const [isSignInActive, setIsSignActive] = useState<boolean>(true);
  const user = useSelector(selectLoggedInUser);

  const onSignInPressed = () => {
    setIsSignActive(true);
    //dispatch(signOut());
  };

  const onSignUpPressed = () => {
    setIsSignActive(false);
    //dispatch(signOut());
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#003f5c",
    },
    loginSelectionContainer: {
      flexDirection: "row",
      marginBottom: 20,
      marginTop: "5%",
    },
    loginContainer: {
      width: "80%",
    },
    loadingIndicator: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
    },
    inactiveButton: {
      color: "#A9A9A9",
    },
    activeButton: {
      color: "#FFFFFF",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
      marginTop: "20%",
    },
  });
  return (
    <View style={styles.container}>
      {user.status == "loading" ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={"#000000"} size="large" />
        </View>
      ) : (
        <View></View>
      )}
      <Text style={styles.logo}>My Nutrition</Text>
      <View style={styles.loginSelectionContainer}>
        <Button
          title="Register"
          type="clear"
          titleStyle={
            isSignInActive ? styles.inactiveButton : styles.activeButton
          }
          onPress={onSignUpPressed}
        ></Button>
        <Button
          title="Sign In"
          type="clear"
          titleStyle={[
            isSignInActive ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={onSignInPressed}
        ></Button>
      </View>
      {
        <View style={styles.loginContainer}>
          {isSignInActive ? (
            <Login navigation={navigation} />
          ) : (
            <Register navigation={navigation} />
          )}
        </View>
      }
    </View>
  );
}

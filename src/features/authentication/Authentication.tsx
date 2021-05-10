import React, { useState } from "react";
import { Button, Card } from "react-native-elements";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Register } from "./Register";
import { Login } from "./Login";
import { useAppSelector } from "../../app/hooks";
import { selectLoggedInUser } from "./userSlice";
import { ActivityIndicator } from "react-native";
import { useAppDispatch } from "../../app/hooks";
import { signOut } from "./userSlice";

export function Authentication() {
  const dispatch = useAppDispatch();
  const [isSignInActive, setIsSignActive] = useState<boolean>(true);
  const user = useAppSelector(selectLoggedInUser);

  const onSignInPressed = () => {
    setIsSignActive(true);
    dispatch(signOut());
  };

  const onSignUpPressed = () => {
    setIsSignActive(false);
    dispatch(signOut());
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    loginSelectionContainer: {
      justifyContent: "center",
      flexDirection: "row",
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
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
      zindex: 99,
    },
    inactiveButton: {
      color: "#A9A9A9",
    },
    activeButton: {
      color: "#FFFFFF",
    },
  });
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#23074D", "#CC5333"]}
      />
      {user.status == "loading" ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={"#000000"} size="large" />
        </View>
      ) : (
        <View></View>
      )}
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
      <View>
        <Card>{<View>{isSignInActive ? <Login /> : <Register />}</View>}</Card>
      </View>
    </View>
  );
}

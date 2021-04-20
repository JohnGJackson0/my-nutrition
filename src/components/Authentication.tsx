import React from "react";
import { Button, Card } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Register } from "./Register";
import { Login } from "./Login";

interface StateType {
  isSignInActive: Boolean;
}

interface PropsType {
  onSignInHandler: (email: string, password: string) => void;
  onSignUpHandler: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

export class Authentication extends React.Component<PropsType, StateType> {
  state = {
    isSignInActive: true,
  };

  onSignInPressed = () => {
    this.setState({ isSignInActive: true });
  };

  onSignUpPressed = () => {
    this.setState({ isSignInActive: false });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <LinearGradient
          style={this.styles.background}
          colors={["#23074D", "#CC5333"]}
        />
        <View style={this.styles.loginSelectionContainer}>
          <Button
            title="Register"
            type="clear"
            titleStyle={
              this.state.isSignInActive
                ? this.styles.inactiveButton
                : this.styles.activeButton
            }
            onPress={this.onSignUpPressed}
          ></Button>
          <Button
            title="Sign In"
            type="clear"
            titleStyle={[
              this.state.isSignInActive
                ? this.styles.activeButton
                : this.styles.inactiveButton,
            ]}
            onPress={this.onSignInPressed}
          ></Button>
        </View>
        <View>
          <Card>
            {
              <View>
                {this.state.isSignInActive ? (
                  <Login onSignInHandler={this.props.onSignInHandler} />
                ) : (
                  <Register onSignUpHandler={this.props.onSignUpHandler} />
                )}
              </View>
            }
          </Card>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    loginSelectionContainer: {
      justifyContent: "center",
      flexDirection: "row",
    },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
    inactiveButton: {
      color: "#A9A9A9",
    },
    activeButton: {
      color: "#FFFFFF",
    },
  });
}

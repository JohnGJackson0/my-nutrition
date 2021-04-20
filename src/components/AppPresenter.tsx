import * as React from "react";
import { connect } from "react-redux";
import {
  signInAction,
  signOutAction,
  signUpAction,
  StateType,
  userSelector,
  User,
  Credential,
} from "core/lib/authentication";
import { Authentication } from "./Authentication";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserComponent } from "./UserComponent";

interface Props {
  user: User | null;
  dispatchSignIn: (credential: Credential) => void;
  dispatchSignUp: (
    firstName: string,
    lastName: string,
    credential: Credential
  ) => void;
  dispatchSignOut: () => void;
}

export const AppModel = (props: Props) => {
  const onSignIn = (email: string, password: string) => {
    props.dispatchSignIn(new Credential(email, password));
  };
  const onSignUp = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      props.dispatchSignUp(
        firstName,
        lastName,
        new Credential(email, password)
      );
    } catch {
      console.log("exception handled");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserComponent user={props.user}></UserComponent>
      <Authentication onSignInHandler={onSignIn} onSignUpHandler={onSignUp} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  dispatchSignIn: signInAction,
  dispatchSignUp: signUpAction,
  dispatchSignOut: signOutAction,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppModel);

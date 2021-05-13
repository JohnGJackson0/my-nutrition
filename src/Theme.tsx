import React from "react";
import { Button, Input, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  themedButtonRounded: {
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  themedText: {
    margin: 5,
    fontSize: 17,
    color: "white",
  },
  inputView: {
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 40,
    margin: 10,
  },
  inputText: {
    height: 40,
    color: "white",
  },
  themedButton: {
    backgroundColor: "#fb5b5a",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  themedButtonVariant: {
    backgroundColor: "#fb5b5a",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveButtonTitle: {
    color: "black",
  },
  inactiveButton: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inactiveButtonVariant: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  errorText: {
    color: "red",
    fontSize: 20,
  },
});

//helps offset with other themed buttons
const inactiveButtonVariant = (props) => {
  return (
    <Button
      type="clear"
      titleStyle={{ color: "black" }}
      style={styles.inactiveButtonVariant}
      {...props}
    />
  );
};

const themedButtonRounded = (props) => {
  return (
    <Button
      type="clear"
      titleStyle={{ color: "white" }}
      style={styles.themedButtonRounded}
      {...props}
    />
  );
};

const themedButton = (props) => {
  return (
    <Button
      type="clear"
      titleStyle={{ color: "white" }}
      style={styles.themedButton}
      {...props}
    />
  );
};

const inactiveButton = (props) => {
  return (
    <Button
      titleStyle={styles.inactiveButtonTitle}
      type="clear"
      style={styles.inactiveButton}
      {...props}
    ></Button>
  );
};

const themedInput = (props) => {
  return (
    <View style={styles.inputView}>
      <Input
        {...props}
        style={styles.inputText}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    </View>
  );
};

const themedText = (props) => {
  return <Text style={styles.themedText} {...props}></Text>;
};

const themedErrorText = (props) => {
  return <Text style={styles.errorText} {...props}></Text>;
};

const themedBackgroundColor = "#003f5c";

export const Theme = {
  themedButtonRounded,
  themedButton,
  inactiveButton,
  themedInput,
  themedText,
  themedBackgroundColor,
  inactiveButtonVariant,
  themedErrorText
};

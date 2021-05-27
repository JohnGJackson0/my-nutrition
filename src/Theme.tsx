import React from "react";
import { Button, Input, Text, Overlay } from "react-native-elements";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "modal-react-native-web";
import DropDownPicker from "react-native-dropdown-picker";

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
  themedCoolText: {
    margin: 5,
    fontSize: 30,
    color: "#fb5b5a",
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
    zIndex: 0.5,
  },
  themedClearButton: {
    height: 50,
    borderRadius: 25,
    borderColor: "#fb5b5a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
  },
  themedItemButton: {
    height: 50,
    margin: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
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
  modalContainer: {},
  modal: {},
  errorText: {
    color: "red",
    fontSize: 20,
  },
});

//using overlay to help support web
const themedModal = (props) => {
  return (
    <View>
      {props.isVisible == true ? <_modal {...props}></_modal> : <View></View>}
    </View>
  );
};

const _modal = (props) => {
  return (
    <View style={styles.modalContainer}>
      <Overlay
        {...props}
        ModalComponent={Modal}
        transparent={true}
        animationType="slide"
      >
        <Button title="X" style={{ zIndex: 0.5 }}></Button>
        {props.children}
      </Overlay>
    </View>
  );
};

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

const themedPrimaryColor = "#fb5b5a";
const themedBackgroundColor = "#003f5c";

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

const themedClearButton = (props) => {
  return (
    <Button
      type="clear"
      titleStyle={{ color: "white" }}
      style={styles.themedClearButton}
      {...props}
    />
  );
};

const themedItemButton = (props) => {
  return (
    <Button
      type="clear"
      titleStyle={{ color: "white" }}
      style={styles.themedItemButton}
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

/*

         <Theme.themedInput
            placeholder="enter your height in feet"
            keyboardType="number-pad"
            numeric
            value={heightFt}
            onChangeText={(value: string) => handleHeightFt(value)}
          ></Theme.themedInput>

*/

//TODO: validate
//onChangeText={(value: string) => handleHeightFt(value)}

const themedInputNumber = (props) => {
  return (
    <View style={styles.inputView}>
      <Input
        {...props}
        keyboardType="number-pad"
        numeric
        style={styles.inputText}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    </View>
  );
};

const themedText = (props) => {
  return <Text style={styles.themedText} {...props}></Text>;
};

const themedCoolText = (props) => {
  return <Text style={styles.themedCoolText} {...props}></Text>;
};

const themedErrorText = (props) => {
  return <Text style={styles.errorText} {...props}></Text>;
};

export const Theme = {
  themedButtonRounded,
  themedButton,
  inactiveButton,
  themedInput,
  themedText,
  themedBackgroundColor,
  inactiveButtonVariant,
  themedErrorText,
  themedCoolText,
  themedPrimaryColor,
  themedClearButton,
  themedModal,
  themedInputNumber,
  themedItemButton,
};

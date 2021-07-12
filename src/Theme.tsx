import React from "react";
import { Button, Input, Text, Overlay } from "react-native-elements";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from "modal-react-native-web";
import { ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
  themedButtonRounded: {
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    margin: 5,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
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
    margin: 5,
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
  themedClearButtonNoOutline: {
    height: 50,
  },
  themedItemButton: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
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
  seperatorView: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  modalContainer: {},
  modal: {},
  errorText: {
    color: "red",
    fontSize: 20,
    margin: 5,
  },
  inactiveButtonNoOutline: {
    color: "#A9A9A9",
  },
  logo: {
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginTop: "15%",
  },
  logoContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
  },
});

const themedBackgroundContainer = (props) => {
  return <View style={styles.container} {...props}></View>;
};

const themedLogo = (props) => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logo} {...props}>
        My Nutrition
      </Text>
    </View>
  );
};

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

const themedLoadingIndicator = (props) => {
  return (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator color={"white"} size="large" />
    </View>
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

const themedClearButtonNoOutline = (props) => {
  return (
    <Button
      titleStyle={{ color: "white" }}
      style={styles.themedClearButtonNoOutline}
      type="clear"
      {...props}
    />
  );
};

const inactiveButtonNoOutline = (props) => {
  return (
    <Button
      titleStyle={{ color: "#A9A9A9" }}
      style={styles.inactiveButtonNoOutline}
      type="clear"
      {...props}
    />
  );
};

const themedItemButton = (props) => {
  return (
    <TouchableOpacity style={styles.themedItemButton} {...props}>
      <Theme.themedText>{props.title}</Theme.themedText>
    </TouchableOpacity>
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

const themedSeperator = () => {
  return <View style={styles.seperatorView}> </View>;
};

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
  themedSeperator,
  themedLoadingIndicator,
  themedClearButtonNoOutline,
  inactiveButtonNoOutline,
  themedLogo,
  themedBackgroundContainer,
};

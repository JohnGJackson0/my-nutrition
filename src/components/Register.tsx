import * as React from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PropsType {
  onSignUpHandler: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

interface StateType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class Register extends React.Component<PropsType, StateType> {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  handleChangeEmail = (email: string) => {
    this.setState({ email });
  };

  handleChangePassword = (password: string) => {
    this.setState({ password });
  };

  handleChangeFirstName = (firstName: string) => {
    this.setState({ firstName });
  };

  handleChangeLastName = (lastName: string) => {
    this.setState({ lastName });
  };

  handleSubmit = () => {
    const { email, password, firstName, lastName } = this.state;
    console.log("onSignUp handle Subbmit component email " + email);
    this.props.onSignUpHandler(firstName, lastName, email, password);
  };

  render() {
    return (
      <View>
        <Input
          placeholder="First Name"
          value={this.state.firstName}
          onChangeText={this.handleChangeFirstName}
          onSubmitEditing={this.handleSubmit}
        />
        <Input
          placeholder="Last Name"
          value={this.state.lastName}
          onChangeText={this.handleChangeLastName}
          onSubmitEditing={this.handleSubmit}
        />
        <Input
          placeholder="Email"
          leftIcon={<Icon name="email-outline" size={24} color="grey" />}
          value={this.state.email}
          onChangeText={this.handleChangeEmail}
          onSubmitEditing={this.handleSubmit}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={this.handleChangePassword}
          onSubmitEditing={this.handleSubmit}
          leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
        />
        <Button title="Register" type="solid" onPress={this.handleSubmit} />
        <View>
          <Text></Text>
        </View>
      </View>
    );
  }
}

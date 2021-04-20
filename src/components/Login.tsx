import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";

interface PropsType {
  onSignInHandler: (email: string, password: string) => void;
}

interface StateType {
  email: string;
  password: string;
}

export class Login extends React.Component<PropsType, StateType> {
  state = {
    email: "",
    password: "",
  };

  handleChangeEmail = (email: string) => {
    this.setState({ email });
  };

  handleChangePassword = (password: string) => {
    this.setState({ password });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.props.onSignInHandler(email, password);
  };

  render() {
    return (
      <View>
        <Input
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleChangeEmail}
          leftIcon={<Icon name="email-outline" size={24} color="grey" />}
          onSubmitEditing={this.handleSubmit}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={this.state.password}
          onChangeText={this.handleChangePassword}
          leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
          onSubmitEditing={this.handleSubmit}
        />
        <Button onPress={this.handleSubmit} title="Sign In" type="solid" />
      </View>
    );
  }
}

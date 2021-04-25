import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";


interface PropsType {
  onSignInHandler: (email: string, password: string) => void;
}

export const Login: React.FC<PropsType> = (props) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);

  const onSubmit = () => {
    props.onSignInHandler(email, password);
  };

  return (
    <View>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(value)=> setEmail(value)}
        leftIcon={<Icon name="email-outline" size={24} color="grey" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
        leftIcon={<Icon name="lock-outline" size={24} color="grey" />}
      />
      <Button onPress={onSubmit} title="Sign In" type="solid" />
    </View>
  );
}
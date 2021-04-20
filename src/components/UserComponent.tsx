import * as React from "react";
import { User } from "core/lib/authentication";
import { Text, View } from "react-native";

interface PropsType {
  user: User | null;
}

export const UserComponent = (props: PropsType) => {
  return props.user ? (
    <View>
      <Text>Name: {props.user.name}</Text>
      <Text>email: {props.user.name}</Text>
    </View>
  ) : (
    <Text>No User</Text>
  );
};

import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLoggedInUser, signOut } from "./userSlice";
import { Button, Input } from "react-native-elements";
import { Text, View } from "react-native";
import { useAppDispatch } from "../../app/hooks";

export function User() {
  const user = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return user.user ? (
    <View>
      <Text>email: {user.user.email}</Text>
      <Text>
        name: {user.user.firstName} {user.user.lastName}
      </Text>
      <Text>status: {user.status}</Text>
      <Text>message: {user.message}</Text>
      <Button title="Sign out" type="solid" onPress={handleSignOut} />
    </View>
  ) : (
    <View>
      <Text>No User</Text>
      <Text>status: {user.status}</Text>
      <Text>message: {user.message}</Text>
    </View>
  );
}

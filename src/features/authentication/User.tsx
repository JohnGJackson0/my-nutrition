import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, signOut } from "./userSlice";
import { Button, Input } from "react-native-elements";
import { Text, View } from "react-native";

export function User() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

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

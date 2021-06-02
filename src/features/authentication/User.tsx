import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, signOut } from "./userSlice";
import { Button } from "react-native-elements";
import { Text, View } from "react-native";
import {
  selectUserInfo,
  getGoalAsync,
} from "../userSurvey/questions/UserInfoSlice";
import { Theme } from "../../Theme";

export function User() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoalAsync);
  }, []);

  const userInfo = useSelector(selectUserInfo);

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

      {userInfo.calorieGoalError != "" ? (
        <View>
          <Theme.themedErrorText>
            There was an issue with your most recent calorie submission.
          </Theme.themedErrorText>
          <Theme.themedErrorText>
            {userInfo.calorieGoalError}
          </Theme.themedErrorText>
        </View>
      ) : (
        <View>
          <Text>goal: {userInfo.calorieGoal}</Text>
        </View>
      )}

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

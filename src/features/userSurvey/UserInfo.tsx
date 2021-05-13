import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Gender } from "./questions/gender";
import { Weight } from "./questions/weight";
import { Age } from "./questions/age";
import { Height } from "./questions/Height";
import { MesuringSystem } from "./questions/MesuringSystem";

export function UserInfo() {
  return (
    <View>
      <MesuringSystem></MesuringSystem>
      <Gender></Gender>
      <Age></Age>
      <Height></Height>
      <Weight></Weight>
    </View>
  );
}

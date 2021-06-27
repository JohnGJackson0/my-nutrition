import React, { FunctionComponent } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { Theme } from "src/Theme";
import { FoodLogState } from "../AccountAPI";

const numberOfColumns = 3;
const size = Dimensions.get("window").width / 3;

export function EntryLog(props) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#003f5c",
      width: "100%",
    },
    itemContainer: {
      width: size,
      height: size,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={props.foodState}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Theme.themedText>{item.calories}</Theme.themedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numberOfColumns}
      />

      <View style={styles.itemContainer}></View>
      <Theme.themedText>{props.foodState.calories}</Theme.themedText>
      <Theme.themedText>2</Theme.themedText>
    </View>
  );
}

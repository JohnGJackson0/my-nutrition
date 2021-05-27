import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
import { selectFoods, getFoodsAsync } from "./foodSearchSlice";
import { setFoodAsync } from "./foodSlice";
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

//https://jsonplaceholder.typicode.com/posts/

//TODO:
// memoize
// modal add
// commit

export function AddFood({ navigation }) {
  const foods = useSelector(selectFoods);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    dispatch(getFoodsAsync(searchTerm));
  }, [dispatch]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#003f5c",
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: "#fb5b5a",
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
    item: {},
    title: {},
  });

  const handleChangeSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(getFoodsAsync(term));
  };

  const actionOnRow = (item) => {
    dispatch(setFoodAsync(item.foodId));
    navigation.navigate("FoodModal");
  };

  const Item = ({ item }) => (
    <Theme.themedItemButton
      title={item.foodName}
      onPress={() => {
        actionOnRow(item);
      }}
    >
      <Text>{item.title}</Text>
    </Theme.themedItemButton>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.container}>
      <Theme.themedInput
        placeholder="enter food to search"
        value={searchTerm}
        onChangeText={handleChangeSearch}
      ></Theme.themedInput>

      {foods.status == "loading" ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={"#000000"} size="large" />
        </View>
      ) : (
        <View></View>
      )}
      <FlatList data={foods.food} renderItem={renderItem}></FlatList>
    </View>
  );
}

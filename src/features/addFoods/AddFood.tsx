import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Theme } from "src/Theme";
import { selectFoods, getFoodsAsync } from "./foodSearchSlice";
import { setFoodAsync } from "./foodSlice";
import { ActivityIndicator } from "react-native-paper";

export function AddFood({ navigation }) {
  const foods = useSelector(selectFoods);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getFoodsAsync(searchTerm));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#003f5c",
      flex: 1,
    },
    item: {
      padding: 1,
      marginVertical: 1,
      marginHorizontal: 1,
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
    foods: {
      height: "100%",
    },
    title: {},
  });

  const handleChangeSearch = (term: string) => {
    setSearchTerm(term);
  };

  const actionOnRow = (item) => {
    dispatch(setFoodAsync(item.foodId));
    navigation.navigate("FoodModal");
  };

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Theme.themedItemButton
        title={(
          item.foodName + brandInfo(item.foodBrand, item.foodOwner)
        ).trimStart()}
        onPress={() => {
          actionOnRow(item);
        }}
      />
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const brandInfo = (foodBrand: string, foodOwner: string) => {
    var result = "";

    if (typeof foodBrand !== "undefined") {
      result = "\n" + foodBrand;
    } else if (typeof foodOwner !== "undefined") {
      result = result + "\n" + foodOwner;
    }

    return result.toLowerCase();
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
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : (
        <View style={styles.foods}>
          <FlatList
            data={foods.food}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
          ></FlatList>
        </View>
      )}
    </View>
  );
}

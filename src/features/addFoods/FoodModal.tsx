import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "src/Theme";
import { selectFood } from "./foodSlice";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { ActivityIndicator } from "react-native-paper";

export function FoodModal({ navigation }) {
  const food = useSelector(selectFood);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{ label: "", value: "" }]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setItems(food.food.caloriesPerServing);
  }, [food]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.themedBackgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonGroupContainer: {
      width: "100%",
      flexDirection: "row",
    },
    buttonContainer: {
      width: "50%",
      alignSelf: "stretch",
      padding: 5,
      alignContent: "center",
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
  });

  const handleQty = (QtyInput: number) => {
    setQty(QtyInput);
  };

  return (
    <View style={styles.container}>
      {food.status == "loading" ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <Theme.themedText>I ate a</Theme.themedText>
          <View
            style={{
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropDownPicker
              style={{ zIndex: 5 }}
              textStyle={{
                fontSize: 35,
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              listMode="SCROLLVIEW"
              itemSeparator={true}
              theme="DARK"
              activityIndicatorSize={90}
              rtl={true}
            />
          </View>
          <Theme.themedText> of a </Theme.themedText>
          <Theme.themedCoolText>{food.food.foodName}</Theme.themedCoolText>
          <Theme.themedText> today. {"\n\n"}</Theme.themedText>
          <Theme.themedText>This many times </Theme.themedText>
          <Theme.themedInputNumber
            placeholder="enter the quantity of servings"
            value={qty}
            onChangeText={(value: number) => handleQty(value)}
          ></Theme.themedInputNumber>
          <Theme.themedText>
            Which amounts to the following amount of calories,
          </Theme.themedText>
          <Theme.themedCoolText>
            {Math.round(value * qty)}.
          </Theme.themedCoolText>
          <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonContainer}>
              <Theme.themedButtonRounded
                onPress={() => navigation.goBack()}
                title="Eat"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Theme.themedClearButton
                onPress={() => navigation.goBack()}
                title="Dismiss"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

class AppWrapper extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <App />
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});


registerRootComponent(AppWrapper);

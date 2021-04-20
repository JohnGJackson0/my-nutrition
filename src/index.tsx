import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../core/lib/authentication";
import AppModel from "./components/AppPresenter";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={configureStore()}>
          <AppModel />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

registerRootComponent(App);

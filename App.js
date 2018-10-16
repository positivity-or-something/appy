import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Header from './components/header'
import { Provider } from "react-redux";
import store from "./ducks/store";
import MyRouter from "./MyRouter";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MyRouter style={styles.container} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

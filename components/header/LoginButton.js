import React from "react";
import { Button, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

const LoginButton = () => {
  return (
    <Button
      style={styles.button}
      backgroundColor="transparent"
      color="white"
      title="Login"
      onPress={() => console.log("CLICKED") || Actions.register()}
    >
      Login
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlignVertical: "bottom"
  }
});

export default LoginButton;

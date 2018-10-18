import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Comments = props => {
  let modalContent = null;

  return (
    <Modal visible={props.openCloseModal !== null}>
      <View>
        <TextInput
          style={styles.inputStyle}
          multiline={true}
          placeholder="Create a new comment"
        />
        <Button title="Add Comment" onPress={props.closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%"
  }
});

export default Comments;

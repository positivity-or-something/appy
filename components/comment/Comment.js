import React from "react";
import { Modal, View, Button, StyleSheet, TextInput } from "react-native";

const Comment = props => {

  return (
    <Modal visible={props.show}>
      <View>
        <TextInput
          style={styles.inputStyle}
          multiline={true}
          placeholder="Create a new comment"
          onChangeText={(text) => props.commentHandler(text)}
        />
        <Button title="Submit" 
        onPress={() => {
          props.toggleModal()
          props.addComment()
        }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%"
  }
});

export default Comment;

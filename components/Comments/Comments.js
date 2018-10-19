import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TextInput
} from "react-native";

const Comments = props => {
  // let modalContent = null;

  return (
    <View>
      {/* <View style={{ marginTop: 25 }}>{eachComment}</View> */}
      <Modal visible={props.openModal !== null}>
        <View>
          <TextInput
            style={styles.inputStyle}
            multiline={true}
            placeholder="Create a new comment"
            onChangeText={props.makeCommentHandler}
          />
          <Button title="Add Comment" onPress={props.postCommentHandler} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    margin: 50
  }
});

export default Comments;

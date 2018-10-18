import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";

import Comments from "../comment/Comments";
class Content extends Component {
  constructor() {
    super();

    this.state = {
      content: {},
      comments: [],
      upvotes: 0,
      downvotes: 0,
      rep: 0,
      isLoading: true,
      openModal: null
    };
  }

  componentDidMount() {
    axios(`http://localhost:3001/api/post/${this.props.postId}`)
      .then(res =>
        this.setState(
          {
            content: res.data.post[0],
            comments: res.data.comments,
            isLoading: false
          },
          () => this.getRep(res.data.post)
        )
      )
      .catch(err => console.log(err));
  }

  getRep(reputation) {
    let upvotes = 0;
    let downvotes = 0;
    for (let i = 0; i < reputation.length; i++) {
      reputation[i].upvote > 0
        ? upvotes++
        : reputation[i].downvote > 0
          ? downvotes++
          : null;
    }
    this.setState({
      upvotes,
      downvotes,
      rep: upvotes - downvotes
    });
  }

  async vote(type) {
    console.log("HIT VOTE METHOD");
    let body = {
      userId: this.props.userId
    };
    type
      ? await axios.post(
          `http://localhost:3001/api/upvote/${this.props.postId}`,
          body
        )
      : await axios.post(
          `http://localhost:3001/api/downvote/${this.props.postId}`,
          body
        );

    axios(`http://localhost:3001/api/post/${this.props.postId}`)
      .then(res =>
        this.setState(
          {
            content: res.data.post[0],
            comments: res.data.comments,
            isLoading: false
          },
          () => this.getRep(res.data.post)
        )
      )
      .catch(err => console.log(err));
  }

  modalClosedHandler = () => {
    this.setState({
      openModal: null
    });
  };

  render() {
    let comments = this.state.comments.map((comment, i) => {
      return <Text key={i}>{`COMMENT ${i + 1}: ${comment.comment_body}`}</Text>;
    });
    return (
      <View style={styles.container}>
        <Text>{`TITLE: ${this.state.content.title}`}</Text>
        <Text style={{ marginTop: 25, marginBottom: 25 }}>{`BODY: ${
          this.state.content.body
        }`}</Text>
        <Icon
          name="keyboard-arrow-up"
          color="green"
          onPress={() => this.vote(true)}
        />
        <Text>{`${this.state.rep}`}</Text>
        <Icon
          name="keyboard-arrow-down"
          color="red"
          onPress={() => this.vote()}
        />
        <Button
          title="Add Comment"
          onPress={this.setState({ openModal: true })}
        />
        <View>{comments}</View>
        {/* <Comments
          closeModal={this.modalClosedHandler}
          openCloseModal={this.state.openCloseModal}
        /> */}
        <Modal visible={this.state.openModal !== null}>
          <View>
            <TextInput
              style={styles.inputStyle}
              multiline={true}
              placeholder="Create a new comment"
            />
            <Button title="Add Comment" onPress={this.closeModal} />
          </View>
        </Modal>
        <View style={{ marginTop: 25 }}>{comments}</View>
      </View>
    );
  }
}

export default connect(state => state)(Content);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    width: "100%"
  }
});

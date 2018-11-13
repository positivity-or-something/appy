import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Icon, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";
import Comment from "../comment/Comment";
import moment from "moment";

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
      openModal: null,
      commentInput: "",
      show: false
    };

    this.toggleModal = this.toggleModal.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments.length !== prevState.comments.length) {
      this.setState({ comments: this.state.comments });
    }
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
  addComment = () => {
    let body = {
      body: this.state.commentInput,
      postId: this.props.postId,
      userId: this.props.userId,
      date: moment()
    };

    axios
      .post(`http://localhost:3001/api/comment`, body)
      .then(res => {
        this.setState({
          comments: res.data.filter(e => e.content_id === this.state.content.id)
        });
      })
      .catch(err => console.log(err));
  };

  commentHandler = text => {
    this.setState({ commentInput: text });
  };

  toggleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    let eachComment = "";
    if (this.state.comments[0]) {
      eachComment = this.state.comments.map((comment, i) => {
        return (
          <View key={i} style={{width: dime.fullWidth - 20, borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingVertical: 10}}>
            <View style={{width: dime.fullWidth - 20, flexDirection: "row"}}>
              <Avatar
                small
                rounded
                source={{ uri: comment.image_url || "URL" }}
                onPress={() =>
                  Actions.profile({
                    selectedUser: this.props.users.filter(
                      e => e.id === comment.user_id)[0]
                    })
                  }
                  />
              <Text style={{paddingLeft: 10, paddingTop: 7, fontWeight: 'bold'}}>{comment.first_name}</Text>
              <Text style={{paddingHorizontal: 10, paddingTop: 7}}>{`${comment.comment_body}`}</Text>
            </View>
          </View>
        );
      });
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              alignSelf: "flex-start",
              flexDirection: "row",
              padding: 10,
              alignItems: "center"
            }}
          >
            <Avatar
              small
              rounded
              source={{ uri: this.props.userImg || "URL" }}
            />
            <Text
              style={{
                fontFamily: "HelveticaNeue-Medium",
                fontSize: 18,
                paddingHorizontal: 10,
                color: "#696969"
              }}
            >
              {this.props.userName}
            </Text>
          </View>
          {this.state.content ? (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: this.state.content.image }}
              />
            </View>
          ) : null}
          <View style={{flexWrap: 'wrap', justifyContent: "space-between", flexDirection: 'row', paddingHorizontal: 20}}>
            <View style={{width: dime.fullWidth * .7}}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "HelveticaNeue-Medium",
                  fontSize: 18,
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                  marginTop: 10,
                  color: "#696969"
                }}
              >
                {this.state.content.title}
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontFamily: "Helvetica Neue",
                  fontSize: 18,
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                  width: this.state.fullWidth,
                  color: "#808080"
                }}
              >
                {this.state.content.body}
              </Text>
            </View>
            <View style={{width: dime.fullWidth * .1}}>
              <Icon
                name="keyboard-arrow-up"
                color="green"
                onPress={() => this.vote(true)}
              />
              <Text style={{paddingLeft: 17}}>{`${this.state.rep}`}</Text>
              <Icon
                name="keyboard-arrow-down"
                color="red"
                onPress={() => this.vote()}
              />
            </View>
            <View style={{width: dime.fullWidth * .1, paddingTop: 20}}>
              <Icon
              name="comment"
              color="grey"
              onPress={() => this.setState({ show: true })}
              />
            </View>
          </View>
          {eachComment ? (
            <View style={{paddingTop: 45}}>
              <Text>{eachComment}</Text>
            </View>
          ) : null}
          <Comment
            addComment={this.addComment}
            show={this.state.show}
            toggleModal={this.toggleModal}
            commentHandler={this.commentHandler}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => state)(Content);

const dime = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

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
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    width: dime.fullWidth,
    height: 400
  }
});

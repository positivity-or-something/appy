import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { getUsers } from "../../ducks/reducer";
import { Header, Avatar, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import LoginButton from "../header/LoginButton";
import Footer from "../footer/Footer";
import axios from "axios";
import { updateContent, deletePost } from "../../ducks/reducer";
import Search from "../search/Search";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      content: [],
      user: {},
      show: false,
      quote: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    //WORKING ON ARTICLES FROM THIS API
    // axios('https://newsapi.org/v2/everything?' +
    // 'q=puppy&' +
    // 'from=2018-10-20&' +
    // 'sortBy=popularity&' +
    // 'apiKey=c9cd68fcd90640f3a023e49292d64491')
    //       .then(response => console.log('NEWS:', response))
    //       .catch(error => console.log('NEWS ERROR', error))

    axios(
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
      .then(res => this.setState({ quote: res.data.quoteText }))
      .catch(err => console.log("QUOTE GENERATOR ERROR", err));

    if (!this.state.content[0]) {
      axios(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/content"
      )
        .then(response => {
          this.props.updateContent(response.data);
        })
        .catch(err => console.warn("ERROR CAUGHT", err));
    }
  }

  componentDidUpdate(prevProps) {
    prevProps.userId !== this.props.userId ||
    (this.props.userId && !this.state.user.image_url)
      ? axios
          .post(`http://localhost:3001/api/getuser`, { id: this.props.userId })
          .then(response => this.setState({ user: response.data[0] }))
          .catch(err => console.log(err))
      : null;
  }

  toggleModal() {
    this.setState({ show: !this.state.show });
  }

  scrollToTop() {
    this.ScrollView.scrollTo({ x: 0, y: 0, animated: true });
  }

  render() {
    console.log(this.props);
    const { content } = this.props;
    let displayContent = null;
    if (content[0]) {
      displayContent = content.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              borderColor: "black",
              borderWidth: 1
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.getUsers();
                Actions.content({ postId: e.id });
              }}
            >
              <Image
                style={{ width: 300, height: 300 }}
                source={{ uri: e.image || "../../img/1-cee-lo-albums.jpg" }}
              />
              <Text>{e.body}</Text>
              <Text>{e.date.slice(0, 10)}</Text>
            </TouchableOpacity>
            {e.user_id === this.props.userId ? (
              <Icon
                raised
                name="delete"
                color="red"
                onPress={() =>
                  alert("Post Deleted") || this.props.deletePost(e.id)
                }
              />
            ) : null}
          </View>
        );
      });
    }
    return (
      <View>
        <StatusBar hidden />
        <Header
          style={styles.header}
          leftComponent={
            <Icon
              name="menu"
              color="white"
              onPress={() => alert("Some Event")}
            />
          }
          centerComponent={
            <Icon
              name="vertical-align-top"
              color="white"
              onPress={this.scrollToTop}
            />
          }
          rightComponent={
            this.props.userId ? (
              <Avatar
                small
                rounded
                source={{ uri: this.state.user.image_url || "URL" }}
                onPress={() => {
                  this.props.getUsers();
                  Actions.profile({ user: this.state.user });
                }}
                activeOpacity={0.7}
              />
            ) : (
              <LoginButton />
            )
          }
          innerContainerStyles={{ marginTop: 10 }}
        />
        <ScrollView
          ref={ref => {
            this.ScrollView = ref;
          }}
          style={{ maxHeight: 777, minHeight: 777 }}
        >
          {displayContent}
        </ScrollView>
        <Search />
        <Footer toggleModal={this.toggleModal} />
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.show}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 100 }}>
              <View>
                <Text>{this.state.quote}</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.toggleModal();
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text>Show Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  },
  header: {
    flex: 1,
    marginTop: 10
  }
});

export default connect(
  state => state,
  { getUsers, updateContent, deletePost }
)(Home);

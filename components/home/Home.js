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
  StatusBar,
  Dimensions,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { getUsers, setUser } from "../../ducks/reducer";
import { Header, Avatar, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import LoginButton from "../header/LoginButton";
import Footer from "../footer/Footer";
import axios from "axios";
import { updateContent, deletePost } from "../../ducks/reducer";
import Search from "../search/Search";

import { myArray } from "../dummydata/dummydata";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      content: [],
      user: {},
      show: false,
      quote: "",
      search: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
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
    AsyncStorage.getItem("userId").then(ressy => console.log(ressy));
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
    if (this.props.userId && !AsyncStorage.getItem("userId")) {
      AsyncStorage.setItem("userId", this.props.userId).then(resp =>
        this.props.setUser(resp)
      );
    }

    if (!this.props.userId) {
      AsyncStorage.getItem("userId")
        .then(id => (id ? this.props.setUser(id) : null))
        .catch(err => console.log(err));
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

  hideSearch() {
    this.setState({ search: false });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    let left,
      center = null;
    this.state.search
      ? (left = (
          <Search style={{ paddingTop: 20 }} hideSearch={this.hideSearch} />
        ))
      : (left = (
          <Icon
            style={{ paddingTop: 20 }}
            name="search"
            color="white"
            onPress={() => this.setState({ search: true })}
          />
        ));
    !this.state.search
      ? (center = (
          <Icon
            name="vertical-align-top"
            color="white"
            onPress={this.scrollToTop}
          />
        ))
      : null;
    const { content } = this.props;
    let displayContent = null;
    if (content[0]) {
      displayContent = content.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              // borderColor: "gray",
              // borderWidth: 0.5,
              alignItems: "center",
              padding: 20,
              marginBottom: 30,
              width: "90%",
              alignSelf: "center",
              backgroundColor: "white",
              borderBottomColor: "#D4E6F1"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.getUsers();
                Actions.content({ postId: e.id });
              }}
              style={{ alignItems: "center" }}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: e.image }} />
              </View>
              <Text style={{ fontWeight: "bold" }}> - {e.title} - </Text>
              <Text style={{ paddingTop: 10, paddingBottom: 5 }}>{e.body}</Text>
              <Text>{e.date.slice(0, 10)}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
    return (
      <View style={{ backgroundColor: "white" }}>
        <StatusBar hidden />
        <Header
          backgroundColor="white"
          leftComponent={left}
          centerComponent={center}
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
              <LoginButton style={{ paddingTop: 10 }} />
            )
          }
          innerContainerStyles={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        />
        <ScrollView
          ref={ref => {
            this.ScrollView = ref;
          }}
          style={{ maxHeight: 600, minHeight: 600, marginBottom: 100 }}
        >
          {displayContent}
        </ScrollView>
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
                <Icon
                  name="close"
                  onPress={() => {
                    this.toggleModal();
                  }}
                />
                <Text>{this.state.quote}</Text>
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

const dime = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  },
  header: {
    flex: 1,
    paddingTop: 25
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

export default connect(
  state => state,
  { getUsers, updateContent, setUser }
)(Home);

import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { getUsers, setUser } from "../../ducks/reducer";
import { Header, Avatar, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import LoginButton from "../header/LoginButton";
import Footer from "../footer/Footer";
import axios from "axios";
import { updateContent } from "../../ducks/reducer";
import Search from "../search/Search";
import {Font} from 'expo'
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredContent: [],
      tags: [
        `Motivation`,
        `Achievement`,
        `PositiveVibes`,
        `Lifestyle  `,
        `Inspiration `,
        `Determination`,
        `Happy   `,
        `Celebration`,
        `Entrepreneur`,
      ],
      currentPosts: [],
      user: {},
      show: false,
      quote: "",
      search: false,
      fullHeight: Dimensions.get("window").height,
      fullWidth: Dimensions.get("window").width
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.handleAll = this.handleAll.bind(this);
  }

  componentDidMount() {
    Font.loadAsync({
      'Lato': require('../../assets/fonts/Merriweather-Regular.ttf'),
    });

    axios(
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
      .then(res => this.setState({ quote: res.data.quoteText }))
      .catch(err => console.log("QUOTE GENERATOR ERROR", err));

    if (!this.props.content[0]) {
      axios(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/content"
      )
        .then(response => {
          this.props.updateContent(response.data);
        })
        .catch(err => console.warn("ERROR CAUGHT", JSON.stringify(err)));
    }
  }

  componentDidUpdate(prevProps) {
    prevProps.userId !== this.props.userId ||
    (this.props.userId && !this.state.user.image_url)
      ? axios
          .post(
            `http://` +
              (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
              `:3001/api/getuser`,
            { id: this.props.userId }
          )
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

  handleAll(text) {
    axios
      .post(
        "http://" +
          (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
          ":3001/api/words",
        { text }
      )
      .then(response => {
        console.log(response.data) ||
          this.setState({ filteredContent: response.data });
      });
  }

  formatPosts(postsArr) {
    let displayContent = postsArr.map((e, i) => {
      return (
        <View
          key={i}
          style={{
            borderColor: "black",
            borderBottomWidth: 2,
            alignItems: "center",
            paddingBottom: 30,
            marginBottom: 10,
            width: "90%",
            alignSelf: "center",
            backgroundColor: "white",
            borderBottomColor: "#D4E6F1"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.getUsers();
              Actions.content({
                postId: e.id,
                userImg: e.image_url,
                userName: e.first_name
              });
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                padding: 10,
                alignItems: "center"
              }}
            >
              <Avatar small rounded source={{ uri: e.image_url || "URL" }} />
              <Text
                style={{
                  fontFamily: "HelveticaNeue-Medium",
                  fontSize: 18,
                  paddingHorizontal: 10,
                  color: "#696969"
                }}
              >
                {e.first_name}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: e.image }} />
            </View>
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
              {e.title}
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
              {e.body}
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 16.5,
                alignSelf: "flex-start",
                paddingLeft: 10,
                color: "#808080"
              }}
            >
              {e.date.slice(0, 10)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
    this.state.currentPosts.length !== displayContent.length
      ? this.setState({ currentPosts: displayContent })
      : null;
  }

  render() {
    let left,
      center = null;
    this.state.search
      ? (left = (
          <Search
            style={{ paddingTop: 20 }}
            hideSearch={this.hideSearch}
            handleAll={this.handleAll}
          />
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
          <View
            style={{
              position: "absolute",
              top: 1,
              left: this.state.fullWidth / 2 - 30
            }}
          >
            <TouchableWithoutFeedback onPress={this.scrollToTop}>
              <Image
                source={{
                  uri:
                    "https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png"
                }}
                style={{ height: 60, width: 60, borderRadius: 25 }}
              />
            </TouchableWithoutFeedback>
          </View>
        ))
      : null;
    const { content } = this.props;
    if (content[0]) {
      this.state.filteredContent[0]
        ? this.formatPosts(this.state.filteredContent)
        : this.formatPosts(this.props.content);
    }
    let tagButtons = this.state.tags.map((e, i) => {
      return (
        <TouchableWithoutFeedback key={i} onPress={() => this.handleAll(e)}>
          <View>
            <Text
              style={{
                alignItems: 'center',
                width: this.state.fullWidth/3.3,
                fontSize: 18,
                color: "#989898",
                alignSelf: "center",
                marginTop: 10
              }}
            >
              {`#${e} `}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        // <Button
        //   key={i}
        //   title={`#${e}`}
        //   Style={{
        //     height: 50,
        //     width: this.state.fullWidth / 4,
        //     color: "#81DAF5"
        //   }}
        //   onPress={() => this.handleAll(e)}
        // />
      );
    });
    return (
      <View style={{ backgroundColor: "white" }}>
        <StatusBar hidden />
        <Header
          backgroundColor="#81DAF5"
          leftComponent={left}
          rightComponent={
            this.props.userId ? (
              <Avatar
                small
                rounded
                source={{ uri: this.state.user.image_url || "URL" }}
                onPress={() => {
                  this.props.getUsers();
                  Actions.profile({ user: this.state.user, current: true });
                }}
                activeOpacity={0.7}
              />
            ) : (
              <LoginButton />
            )
          }
          innerContainerStyles={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
          outerContainerStyles={{
            marginBottom: 0,
            height: 60
          }}
        />
        {center}
        <ScrollView
          ref={ref => {
            this.ScrollView = ref;
          }}
          style={{
            maxHeight: this.state.fullHeight - 100,
            minHeight: this.state.fullHeight - 100
          }}
        >
          <View
            style={{
              width: this.state.fullWidth,
              paddingHorizontal: 10,
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              height: this.state.fullHeight / 6.5,
              alignItems: "center",
              marginBottom: 14
            }}
          >
            {tagButtons}
          </View>
          {this.state.currentPosts}
        </ScrollView>
        <Footer toggleModal={this.toggleModal} />
        <View >
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.show}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                height: this.state.fullHeight,
                backgroundColor: "#81DAF5"
              }}
            >
              <View
                style={{
                  marginTop: 20
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png"
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 25,
                    alignSelf: "center"
                  }}
                />
                <Text
                  style={{
                    padding: 10,
                    fontSize: 50,
                    fontFamily: "Lato",
                    color: "white",
                    alignSelf: "center"
                  }}
                >
                  Appy Quote
                </Text>
                <Text
                  style={{
                    marginBottom: 20,
                    padding: 20,
                    fontSize: 25,
                    fontFamily: 'Lato',
                    color: "white",
                    alignSelf: "center"
                  }}
                >
                  {this.state.quote}
                </Text>
                <Icon
                  name="close"
                  color="white"
                  onPress={() => {
                    this.toggleModal();
                  }}
                />
              </View>
            </View>
          </Modal>
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
    height: 450
  }
});

export default connect(
  state => state,
  { getUsers, updateContent, setUser }
)(Home);

//WORKING ON ARTICLES FROM THIS API
// axios('https://newsapi.org/v2/everything?' +
// 'q=puppy&' +
// 'from=2018-10-20&' +
// 'sortBy=popularity&' +
// 'apiKey=c9cd68fcd90640f3a023e49292d64491')
//       .then(response => console.log('NEWS:', response))
//       .catch(error => console.log('NEWS ERROR', error))

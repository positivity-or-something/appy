import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Avatar, Icon, Header } from "react-native-elements";
import NavigationBar from "react-native-navbar";
import { Actions } from "react-native-router-flux";
import { deletePost } from "../../ducks/reducer";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userContent: [],
      fullHeight: Dimensions.get("window").height,
      fullWidth: Dimensions.get("window").width
    };
  }

  componentDidMount() {
    let posts = this.props.content.filter(e => e.user_id === this.props.userId);
    this.setState({ userContent: posts });
  }

  componentDidUpdate(prevProps) {
    prevProps.content.length !== this.props.content.length
      ? this.setState({
          userContent: this.props.content.filter(
            e => e.user_id === this.props.userId
          )
        })
      : null;
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let posts = [];
    let tags = this.props.user.interests
      .split(",")
      .map(tag => <Text style={{ padding: 2 }}>{`#${tag}`}</Text>);
    if (this.state.userContent[0]) {
      posts = this.state.userContent.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Actions.content({ postId: e.id });
              }}
              style={{ alignItems: "center" }}
            >
              <Image
                style={{ width: this.state.fullWidth, height: 450 }}
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
                onPress={() => {
                  this.props.deletePost(e.id);
                }}
              />
            ) : null}
          </View>
        );
      });
    }
    return (
      <View style={styles.container}>
        {tags}
        <ScrollView>{posts}</ScrollView>
      </View>
    );
  }
}

export default connect(
  state => state,
  { deletePost }
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    marginTop: 10
  }
});

//you have access to the entire current user object on this.props.user
//you have access to all posts by the current user in this.state.userContent
//I commented out the logs on 20 & 21, but they'll give you an idea of what data you have access to if you need anything else.

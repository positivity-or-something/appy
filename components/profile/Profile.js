import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Icon, Avatar } from "react-native-elements";
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
    if (this.props.current) {
      let posts = this.props.content.filter(
        e => e.user_id === this.props.userId
      );
      this.setState({ userContent: posts });
    } else {
      let posts = this.props.content.filter(
        e => e.user_id === this.props.selectedUser.id
      );
      this.setState({ userContent: posts });
    }
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
    console.log(this.state)
    console.log(this.props)
    let posts;
    let tags;
    if (this.props.user) {
      tags = this.props.user.interests
        .split(",")
        .map((tag, i) => (
          <Text
            style={{ fontFamily: "Helvetica Neue", color: "#696969" }}
            key={i}
          >{`#${tag} `}</Text>
        ));
    } else {
      tags = this.props.selectedUser.interests
        .split(",")
        .map((tag, i) => (
          <Text
            style={{ fontFamily: "Helvetica Neue", color: "#696969" }}
            key={i}
          >{`#${tag} `}</Text>
        ));
    }
    if (this.state.userContent[0]) {
      posts = this.state.userContent.map((e, i) => {
        return (
          <View
            key={i}
            style={{
              alignItems: "center",
              position: 'relative',
              marginBottom: 20,
              marginTop: 10,
              borderBottomWidth: 2,
              borderBottomColor: 'grey',
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
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "Helvetica Neue",
                  color: "#808080",
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingHorizontal: 10,
                  fontSize: 18
                }}
              >
                {e.body}
              </Text>
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "Helvetica Neue",
                  color: "#808080",
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingHorizontal: 10,
                  fontSize: 18,
                }}
              >
                {e.date.slice(0, 10)}
              </Text>
            </TouchableOpacity>
            {e.user_id === this.props.userId ? (
              <View style={{position: 'absolute', bottom: 90, right: 20}}>
                <Icon
                raised
                name="delete"
                color="red"
                onPress={() => {
                  this.props.deletePost(e.id);
                }}
                />
              </View>
            ) : null}
          </View>
        );
      });
    }
    return (
      <View style={styles.container}>
      {this.state.userContent[0] ? 
        <View style={{paddingTop: 5, width: dime.fullWidth, alignItems: 'center'}}>
          <Avatar
          small
          rounded
          source={{ uri: this.state.userContent[0].image_url || "URL" }}
          activeOpacity={0.7}
         />
          <View style={{ flexDirection: "row" }}> {tags} </View>
          <Text style={{marginTop: 5, fontSize: 20}}>{`${this.state.userContent[0].first_name}'s posts`}</Text>
        </View>
    : null}
        
        <ScrollView>{posts}</ScrollView>
      </View>
    );
  }
}

export default connect(
  state => state,
  { deletePost }
)(Profile);

const dime = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

const styles = StyleSheet.create({
  container: {
    width: dime.fullWidth,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
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

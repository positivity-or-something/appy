import React from "react";
import { Platform, StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { getUsers } from "../../ducks/reducer";
import { Button, Header, Avatar, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import LoginButton from "../header/LoginButton";
import Footer from "../footer/Footer";
import axios from "axios";
import { updateContent, deletePost } from '../../ducks/reducer'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      content: [],
      user: {}
    };
  }

  componentDidMount() {
    // console.log(
    //   "http://" +
    //     (Platform.OS === "ios" ? "localhost" : "172.31.98.128") +
    //     ":3001/api/content"
    // );
    if(!this.state.content[0]){
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

  componentDidUpdate(prevProps){
    prevProps.userId !== this.props.userId || this.props.userId && !this.state.user.image_url ? 
    axios.post(`http://localhost:3001/api/getuser`, {id: this.props.userId})
      .then(response => this.setState({user: response.data[0]}))
      .catch(err => console.log(err))
      :null
  }

  

  render() {
    console.log(this.props)
    const { content } = this.props;
    let displayContent = null
    if(content[0]){
       displayContent = content.map((e, i) => {
      return (
        <View
          key={i}
          style={{
            borderColor: "black",
            borderWidth: 1
          }}
        >
          <Image
            source={{ uri: e.image || "../../img/1-cee-lo-albums.jpg"}}
          />
          <Text>{e.body}</Text>
          <Text>{e.date}</Text>
          {e.user_id === this.props.userId ? 
          <Button
          onPress={() => this.props.deletePost(e.id)}
          >Delete</Button> : null}
        </View>
      );
    })}
    return (
      <View>
        <Header
          style={styles.header}
          leftComponent={
          <Icon
          name='menu'
          color='white'
          onPress={() => alert('Some Event')}
          />}
          centerComponent={{ text: "APPY", style: { color: "#fff" }}}
          rightComponent={this.props.userId ? 
            <Avatar
              small
              rounded
              source={{uri: this.state.user.image_url || 'URL'}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            /> : 
            <LoginButton />}
            innerContainerStyles={{ marginTop: 10 }}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Home</Text>
          <Button
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            title="Content Link"
            onPress={() => {
              this.props.getUsers();
              Actions.content({ postId: 2 });
            }}
          >
            Content Link
          </Button>
        </View>
        {displayContent}
        <View >
          <Footer />
        </View>
        <View />
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
    flex: 1
  }
});

export default connect(
  state => state,
  { getUsers, updateContent, deletePost }
)(Home);

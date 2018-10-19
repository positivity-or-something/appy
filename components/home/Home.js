import React from "react";
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
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
        <TouchableOpacity
        onPress={() => {
          this.props.getUsers();
          Actions.content({ postId: e.id });
        }}>
          <Image
            style={{width: 300, height: 300}}
            source={{ uri: e.image || "../../img/1-cee-lo-albums.jpg"}}
          />
          <Text>{e.body}</Text>
          <Text>{e.date}</Text>
        </TouchableOpacity>
          {e.user_id === this.props.userId ? 
          <Icon
          raised
          name='delete'
          color='red'
          onPress={() => 
            alert("Post Deleted") ||
            this.props.deletePost(e.id)}
          ></Icon> : null}
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
        <ScrollView style={{maxHeight: 777, minHeight: 777}}>
          {displayContent}
        </ScrollView>
          <Footer style={{position: 'absolute', bottom: 0}}/>
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

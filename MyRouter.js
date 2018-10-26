import React from "react";
import { Stack, Scene, Router } from "react-native-router-flux";
import { View, Image, Text } from 'react-native'
import Home from "./components/home/Home";
import Content from "./components/content/Content";
import Register from "./components/register/Register";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";

const MyRouter = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#81DAF5' , paddingBottom: 14}}>
      <Stack key="root" headerMode="screen">
        <Scene key="home" component={Home} hideNavBar />
        <Scene key="content" component={Content} 
          renderTitle={() => (
            <View>
              <Image
                    source={{uri: 'https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png'}}
                    style={{height: 43, width: 43, borderRadius: 25, marginLeft: 18}}
                  />
              <Text>Post Details</Text>
            </View>
          )}/>
        <Scene key="register" title="Login" component={Register} 
          renderTitle={() => (
              <View>
                <Image
                      source={{uri: 'https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png'}}
                      style={{height: 43, width: 43, borderRadius: 25}}
                    />
                <Text>{` Login`}</Text>
              </View>
            )}/>
        <Scene key="post" title="Create Post" component={Post} 
          renderTitle={() => (
              <View>
                <Image
                      source={{uri: 'https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png'}}
                      style={{height: 43, width: 43, borderRadius: 25, marginLeft: 18}}
                    />
                <Text>Create Post</Text>
              </View>
            )}/>
          <Scene key="profile" title="Profile" component={Profile} 
            renderTitle={() => (
              <View>
                <Image
                      source={{uri: 'https://s3.amazonaws.com/groupprojappy/s3/logo-happy.png'}}
                      style={{height: 43, width: 43, borderRadius: 25}}
                    />
                <Text>Profile</Text>
              </View>
            )}/>
        </Stack>
    </Router>
  );
};

export default MyRouter;

import React from "react";
import { Stack, Scene, Router } from "react-native-router-flux";
import Home from "./components/home/Home";
import Content from "./components/content/Content";
import Register from "./components/register/Register";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";
import RadB from "./components/radB/RadB";

const MyRouter = () => {
  return (
    <Router>
      <Stack key="root" headerMode="screen">
        <Scene key="home" component={Home} hideNavBar />
        <Scene key="content" component={Content} />
        <Scene key="register" title="Login" component={Register} />
        <Scene key="post" title="Create Post" component={Post} />
        <Scene key="profile" title="Profile" component={Profile} />
        <Scene key="radB" component={RadB} />
      </Stack>
    </Router>
  );
};

export default MyRouter;

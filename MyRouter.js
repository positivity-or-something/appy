import React from 'react'
import {Stack, Scene, Router} from 'react-native-router-flux'
import Home from './components/home/Home'
import Content from './components/content/Content'
import Register from './components/register/Register'
import Post from './components/post/Post'


const MyRouter = () =>{ 
  return(
    <Router>
      <Stack key='root' headerMode='none'>
        <Scene key='home' component={Home}/>
        <Scene key='content' component={Content} />
        <Scene key='register' component={Register}/>
        <Scene key='post' component={Post} />
      </Stack>
    </Router>
  )
}

export default MyRouter;
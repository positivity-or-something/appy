import React from 'react'
import {Stack, Scene, Router} from 'react-native-router-flux'
import Home from './components/Home'
import Content from './components/Content'

const MyRouter = () =>{ 
  return(
    <Router>
      <Stack key='root'>
        <Scene key='home' component={Home} title='Home'/>
        <Scene key='content' component={Content} title='Content Screen'/>
      </Stack>
    </Router>
  )
}

export default MyRouter;
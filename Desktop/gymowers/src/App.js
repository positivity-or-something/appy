import React, { Component } from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import router from './router'
import {Provider} from 'react-redux'
import store from './ducks/store'
import Header from './components/Header/Header'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <div className='site_content'>
              <Header/>
              {router}
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;

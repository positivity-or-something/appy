import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Home from './components/Home/Home'
import MowerSales from './components/Sales/MowerSales'
import BladeSales from './components/Sales/BladeSales'
import SalesLanding from './components/Sales/SalesLanding'
import Service from './components/Service/Service'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Details from './components/Details/Details'

export default(
  <Switch>
    <Route component={ Home } exact path='/'></Route>
    <Route component={ MowerSales } path='/mowers'></Route>
    <Route component={ BladeSales } path='/blades'></Route>
    <Route component={ SalesLanding }  path='/sales'></Route>
    <Route component={ Service }  path='/service'></Route>
    <Route component={ About } path='/about'></Route>
    <Route component={ Contact } path='/contact'></Route>
    <Route component={Details} path="/details/:type/:id"/>
  </Switch>
)
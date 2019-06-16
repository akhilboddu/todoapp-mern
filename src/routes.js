import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ScrollToTop from './components/util/ScrollTop'
import Home from './pages/Home'


export default props => (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Home } />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  )
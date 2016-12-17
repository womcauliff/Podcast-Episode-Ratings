import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './Components/App.jsx'
import About from './Components/About.jsx'
import Main from './Components/Main.jsx'
import Podcasts from './Components/Podcasts.jsx'
import Podcast from './Components/Podcast.jsx'
import Episode from './Components/Episode.jsx'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Main}/>
      <Route path="/podcast" component={Podcasts}/>
      <Route path="/podcast/:url_title" component={Podcast}/>
      <Route path="/podcast/:url_title/:ep_id" component={Episode}/>
      {/* 
      <Route path="/podcast/:url_title" component={Podcast}>
      	<Route path="/podcast/:url_title/:ep_id" component={Episode}/>
      </Route> 
    	*/}
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
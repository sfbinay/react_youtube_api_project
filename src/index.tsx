import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Semantic-UI Import
import 'semantic-ui-css/semantic.min.css'

// Imports
import NavBar from './inc/NavBar';
import Home from './Home';
import Detail from './Detail';



const router =
  <Router>
    <NavBar />
    <Route path="/" exact component={Home} />
    <Route path="/detail" exact component={Detail} />
  </Router>


ReactDOM.render(router, document.getElementById('root'));

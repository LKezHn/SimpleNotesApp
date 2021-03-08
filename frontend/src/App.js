import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Context
import NotesState from './context/Notes/NotesState';

//Components
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';


class App extends Component {

  render() {
    return (
      <NotesState>
        <Router>
          <Route path='/' exact component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/me' component={Profile} />
        </Router>
      </NotesState>
    )
  }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Navbar} />
        </Switch>
      </>
    </Router>
  </Provider>

);

export default App;

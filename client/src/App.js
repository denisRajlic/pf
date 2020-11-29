import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </>
    </Router>
  </Provider>

);

export default App;

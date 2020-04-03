import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'
import Home from './components/home'
import Flights from './components/flights'
import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
          <Switch>
            <Route exact path="/flights" component={Flights}/>
            <Route path="/" component={Home}/>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;

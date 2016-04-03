import React    from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  hashHistory,
} from 'react-router';
import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import {Provider}             from 'react-redux';
import io                     from 'socket.io-client';
import reducer                from './reducer';
import {setState}             from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App                    from './components/App';
import Voting                 from './components/Voting';
import Results                from './components/Results';

import './style.css';

const
  socket                    = io(`${location.protocol}//${location.hostname}:8090`),
  // createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore),
  store                     = createStore(reducer, undefined, compose(
    applyMiddleware(remoteActionMiddleware(socket)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )),
  // store                     = createStoreWithMiddleware(reducer),
  routes                    = (
    <Route component={App}>
      <Route path="/results" component={Results} />
      <Route path="/" component={Voting} />
    </Route>
  );

socket.on('state', state => store.dispatch(setState(state)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

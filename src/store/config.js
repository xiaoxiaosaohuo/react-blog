import React, {Component}from 'react';
import {createStore,applyMiddleware,compose} from 'redux'
import logger from 'redux-logger'

import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware,ConnectedRouter } from 'react-router-redux'
import rootSaga from '../sagas'
import rootReducer from '../reducers'
import App from '../containers/app'


const win = window;
const sagaMiddleware = createSagaMiddleware();

 const history = createHistory()
const routingMiddleware = routerMiddleware(history)
const middlewares = [routingMiddleware];
let storeEnhancers ;
if(process.env.NODE_ENV==='production'){
    storeEnhancers = compose(
        applyMiddleware(...middlewares,sagaMiddleware)
    );
}else{
    storeEnhancers = compose(
        applyMiddleware(...middlewares,sagaMiddleware,logger),
        (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
    );
}

 function configureStore(initialState={}) {
    const store = createStore(rootReducer, initialState,storeEnhancers);
    sagaMiddleware.run(rootSaga);
    if (module.hot && process.env.NODE_ENV!=='production') {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept( '../reducers',() => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}




 const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
          <ConnectedRouter history = {history}>
              <App></App>
          </ConnectedRouter>


      </Provider>
    );
  }
}

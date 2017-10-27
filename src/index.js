import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'

import configureStore from './store/config'

import App from './containers/app'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');
const store = configureStore();
render(
        <Provider store={store}>
           <App/>
       </Provider>
    ,
    mountNode
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}

import React from 'react';
import  {render}  from 'react-dom';
import 'babel-polyfill';
import Root from './store/config';

import Perf from 'react-addons-perf';
window.Perf = Perf;

render(
    <Root  />
    ,
    document.getElementById('app')
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}

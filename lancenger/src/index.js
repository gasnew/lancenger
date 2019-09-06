// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App 
      style={{
        position: 'fixed',
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
  />,
  document.getElementById('root') || document.createElement('div')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

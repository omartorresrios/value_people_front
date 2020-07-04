import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/vendors/normalize.css'
import './styles/vendors/skeleton.css'

import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.getElementById('root'),
  )
});

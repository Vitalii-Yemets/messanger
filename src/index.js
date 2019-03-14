import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { store } from './store'
import * as Ontology from 'ontology-dapi'

import Root from './containers/Root'
import './index.css'

Ontology.client.registerClient({})

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
)

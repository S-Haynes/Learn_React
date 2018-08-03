import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ingredientReducer from './store/reducers/ingredientReducer';
import thunk from 'redux-thunk'

const store = createStore(ingredientReducer, applyMiddleware(thunk))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  )
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

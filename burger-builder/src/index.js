import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ingredientReducer from './store/reducers/ingredientReducer';
import ordersReducer from './store/reducers/orders'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  orders: ordersReducer,
  ingredients: ingredientReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  )
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

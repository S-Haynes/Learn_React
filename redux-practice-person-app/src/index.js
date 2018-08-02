import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import formReducer from './store/reducers/form';
import personsReducer from './store/reducers/persons';

const rootReducer = combineReducers({
  persons: personsReducer,
  form: formReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
      <App />
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

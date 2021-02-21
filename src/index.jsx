import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/js/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-circular-progressbar/dist/styles.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import NavControlReducer from "./store/reducers/NavControlReducer";
import Token from "./store/reducers/TokenReducer";
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const rootReducer = combineReducers({
  navControl: NavControlReducer,
  tokenSaver: Token
});

// Adding a middleware, for being able to execute code before each reducer comes on action
const logger = store => {
  return next => {
    return action => {
      console.log("middleware dispatching", action)
      const result = next(action);
      return result;
    }
  }
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

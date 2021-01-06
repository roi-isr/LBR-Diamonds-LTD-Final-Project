import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/js/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {createStore,combineReducers} from 'redux'
import { Provider } from "react-redux";
import NavControlReducer from "./store/reducers/NavControlReducer";
import Token from "./store/reducers/TokenReducer";

const rootReducer=combineReducers({
  navControl: NavControlReducer,
  tokenSaver: Token
})
const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

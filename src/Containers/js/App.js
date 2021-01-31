import React from 'react';
import '../css/App.css';
import Header from '../../Constants/jsx/Header'
import Footer from '../../Constants/jsx/Footer'
import RouterComponent from '../../Routers/Router'
import {BrowserRouter as Router} from 'react-router-dom'

function App(props) {
  return (
    <React.Fragment>
        <Header />
        <hr className="page-seperator" />
        <RouterComponent routing='User' />
        <hr className="page-seperator" />
        <Footer />
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import '../css/App.css';
import Header from '../../Constants/jsx/Header'
import Footer from '../../Constants/jsx/Footer'
import RouterComponent from '../../Routers/Router'

function App(props) {
  return (
    <React.Fragment>
      <Header />
      <hr className="page-seperator" />
      <RouterComponent/>
      <hr className="page-seperator" />
      <Footer />
    </React.Fragment>
  );
}

export default App;

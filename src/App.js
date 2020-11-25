import React from 'react';
import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Homepage from './Components/Homepage'

function App() {
  return (
    <React.Fragment>
      <Header />
      {/* Router */}
      <Homepage />
      <Footer />
    </React.Fragment>
  );
}

export default App;

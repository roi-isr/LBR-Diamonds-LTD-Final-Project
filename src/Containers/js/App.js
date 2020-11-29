import React from 'react';
import '../css/App.css';
import Header from '../../Constants/jsx/Header'
import Footer from '../../Constants/jsx/Footer'
import Homepage from '../../Components/HomePage/jsx/Homepage'
import Store from '../../Components/VirtualStore/jsx/VirtualStore'
import QA from '../../Components/FAQ/jsx/QA'
import Contact from '../../Components/ContactUs/jsx/Contact'
import About from '../../Components/About/jsx/About'
import Sign from '../../Components/Login/SigninForm'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Header />
      <hr className="page-seperator" />
      {/* using react-router-dom for implementing multi-page application with a router component */}
      <Router>
        <Switch>
          <Route path="/" exact><Homepage /></Route>
          <Route path="/sign"><Sign /></Route>
          <Route path="/home"><Homepage /></Route>
          <Route path="/store"><Store /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/qa"><QA /></Route>
          <Route path="/contact"><Contact /></Route>
        </Switch>
      </Router>
      <hr className="page-seperator" />
      <Footer />
    </React.Fragment>
  );
}

export default App;

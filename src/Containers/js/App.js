import React, { useEffect } from 'react';
import '../css/App.css';
import Header from '../../Constants/jsx/Header'
import Footer from '../../Constants/jsx/Footer'
import Homepage from '../../Components/HomePage/jsx/Homepage'
import Store from '../../Components/VirtualStore/jsx/VirtualStore'
import QA from '../../Components/FAQ/jsx/QA'
import Contact from '../../Components/ContactUs/jsx/Contact'
import About from '../../Components/About/jsx/About'
import Sign from '../../Components/Login/SigninForm'
import Admin from '../../Components/Admin/Admin'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { propTypes } from 'react-bootstrap/esm/Image';
import Cookies from "universal-cookie";
import { update_login_stat } from '../../store/actions/actions'

const App = (props) => {

  const getTokenFromCookies = () => {
    const cookies = new Cookies();
    const token = cookies.get("tokenStr");
    props.updateLoginStat(token);
  }

  useEffect(() => getTokenFromCookies(), [])
  return (
    <React.Fragment>
      <Header />
      <hr className="page-seperator" />
      {/* using react-router-dom for implementing multi-page application with a router component */}
      <Router>
        <Switch>
          <Route path="/" exact><Homepage /></Route>
          <Route path="/home"><Homepage /></Route>
          <Route path="/store"><Store /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/qa"><QA /></Route>
          <Route path="/contact"><Contact /></Route>
          <Route path="/sign-in"><Sign /></Route>
          <Route path="/admin">{props.isLoggedIn ? <Admin /> : <div>You're not authorized as admin</div>}</Route>
        </Switch>
        {props.isLoggedIn ? <Redirect to="/admin" /> : null}
      </Router>
      <hr className="page-seperator" />
      <Footer />
    </React.Fragment>
  );
}

// consumer
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.tokenSaver.isLoggedIn
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    updateLoginStat: (token) => dispatch(update_login_stat(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(App);

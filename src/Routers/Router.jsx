/* using react-router-dom for implementing multi-page application with a router component */

import React from 'react';
import Homepage from '../Components/HomePage/jsx/Homepage'
import Store from '../Components/VirtualStore/jsx/VirtualStore'
import QA from '../Components/FAQ/jsx/QA'
import Contact from '../Components/ContactUs/jsx/Contact'
import About from '../Components/About/jsx/About'
import Sign from '../Components/Login/sign-in-side/SignInSide'
import WithAdmin from '../HOC/WithAdmin'
import Admin from '../Components/Admin/Admin'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import NotFound from '../Components/NotFound/NotFound'

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact><Redirect to="home" /></Route>
                    <Route path="/home"><Homepage /></Route>
                    <Route path="/store"><Store /></Route>
                    <Route path="/about"><About /></Route>
                    <Route path="/qa"><QA /></Route>
                    <Route path="/contact"><Contact /></Route>
                    <Route path="/admin">
                        <WithAdmin>
                            <Sign />
                            <Admin />
                        </WithAdmin>
                    </Route>
                    <Route path=""><NotFound /></Route>
                </Switch>
            </Router>
        );
    }
}

export default RouterComponent;
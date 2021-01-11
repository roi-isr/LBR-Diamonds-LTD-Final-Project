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

const paths = [
    { attr: { path: '/', exact: true }, component: <Redirect to="home" /> },
    { attr: { path: '/home' }, component: <Homepage /> },
    { attr: { path: '/store' }, component: <Store /> },
    { attr: { path: '/about' }, component: <About /> },
    { attr: { path: '/qa' }, component: <QA /> },
    { attr: { path: '/contact' }, component: <Contact /> },
    { attr: { path: '/admin' }, component: <WithAdmin><Sign /><Admin /></WithAdmin> },
    { attr: { path: '' }, component: <NotFound /> },
]

class RouterComponent extends React.Component {
    render() {

        return (
            <Router>
                <Switch>
                    {paths.map((item, index) =>
                        <Route key={index}  {...item.attr}>{item.component}</Route>
                    )}
                </Switch>
            </Router>
        );
    }
}

export default RouterComponent;
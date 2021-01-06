import React, { useEffect } from 'react';
// import { NavItem } from 'react-bootstrap';
// import {CostumizedNavItem} from '../../Constants/jsx/Header'
import { connect } from 'react-redux'
import { change_content, change_visiblity, update_login_stat } from '../../store/actions/actions'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Cookies from "universal-cookie";

const Admin = (props) => {
    const getTokenFromCookies = () => {
        const cookies = new Cookies();
        const token = cookies.get("tokenStr");
        props.updateLoginStat(token);
    }

    const removeCookies = () => {
        const cookies = new Cookies();
        cookies.set("tokenStr", "", { path: '/' });
    }

    const logout = () => {
        removeCookies();
        return <Redirect to="/home" />;
    }

    const changeToAdmin = () => {
        const adminNav = [{ name: "Reports", path: "/reports" }, { name: "Logout", path: "/logout" }]
        props.showNav()
        props.changeContent(adminNav)
        getTokenFromCookies()
    }
    useEffect(() => {
        if (!props.isLoggedIn)
            changeToAdmin()
    }
        , [])

    return (
        props.isLoggedIn ?
            <React.Fragment>
                <div>Admin page</div>
                <Router>
                    <Switch>
                        <Route path="/logout">{() => logout()}</Route>
                    </Switch>
                </Router>
            </React.Fragment>
            :
            <div>You're not authorized as admin</div>
    );
}

const mapDispatchToProp = (dispatch) => {
    return {
        changeContent: (content) => dispatch(change_content(content)),
        showNav: () => dispatch(change_visiblity(true)),
        updateLoginStat: (token) => dispatch(update_login_stat(token))
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.tokenSaver.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Admin);

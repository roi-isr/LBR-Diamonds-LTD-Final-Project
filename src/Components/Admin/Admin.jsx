/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { change_content, change_visiblity, update_login_stat } from '../../store/actions/actions'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Cookies from "universal-cookie";


const Admin = (props) => {
    useEffect(() => {
        changeNavToAdmin()
        if (!props.isLoggedIn)
        getTokenFromCookies()
    }, [])

    /* Log off as admin and return to home page*/
    const logout = () => {
        removeCookies();
    }
    
    /* Remove access token from browser cookies */
    const removeCookies = () => {
        const cookies = new Cookies();
        cookies.set("tokenStr", "", { path: '/' });
    }
    /* Get access token from cookies, in case of a page refresh */
    const getTokenFromCookies = () => {
        const cookies = new Cookies();
        const token = cookies.get("tokenStr");
        props.updateLoginStat(token);
    }

    /* Display dedicated navbar options for admin */
    const changeNavToAdmin = () => {
        const adminNav = [{ name: "Reports", path: "/reports" }, { name: "Logout", click: logout }]
        props.changeContent(adminNav)
        props.showNav()
    }

    return (
        <React.Fragment>
            {props.isLoggedIn ?
                <div>Admin page</div>
                :
                <div>You're not authorized as admin</div>}
        </React.Fragment>

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

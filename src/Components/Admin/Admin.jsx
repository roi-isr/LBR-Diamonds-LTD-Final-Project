/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { change_content, change_visiblity, log_out } from '../../store/actions/actions'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Cookies from "universal-cookie";
import stock from "../Stock-table/stock-table"
import BasicTable from '../Stock-table/stock-table';
import DataTable from '../Delivery-check/Delivery-file'


function Admin(props) {
    useEffect(() => {
        changeNavToAdmin()
    }, [])

    /* Log off as admin and return to home page*/
    const logout = () => {
        const logOutPrompt = window.confirm("Are you sure that you want to log out?");
        if (logOutPrompt) {
            removeCookies();
            props.logOut();
            props.showNav(false)
        }
    }

    /* Remove access token from browser cookies */
    const removeCookies = () => {
        const cookies = new Cookies();
        cookies.set("tokenStr", "", { path: '/' });
    }

    /* Display dedicated navbar options for admin */
    const changeNavToAdmin = () => {
        const adminNav = [{ name: "Reports", path: "/reports" }, { name: "Logout", click: logout }]
        props.changeContent(adminNav)
        props.showNav(true)
    }

    return (
        <React.Fragment>
            {props.isLoggedIn ?
             <DataTable/>
                :
                <div>You're not authorized as admin</div>}
        </React.Fragment>

    );
}

const mapDispatchToProp = (dispatch) => {
    return {
        changeContent: (content) => dispatch(change_content(content)),
        showNav: (bool) => dispatch(change_visiblity(bool)),
        logOut: () => dispatch(log_out())
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.tokenSaver.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Admin);

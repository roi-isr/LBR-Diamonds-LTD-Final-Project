/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { change_content, change_visiblity, log_out } from '../../store/actions/index';
import { WebCookies } from '../../Entities/Cookies';
import { withRouter, useHistory } from 'react-router-dom';
import RouterComponent from '../../Routers/Router'
import './Admin.css';
import styled from 'styled-components/macro'

const AdminWelcome = styled.h1`
    font-size: 180px;
    text-align: center;
    margin: 100px 0;
    @media (max-width: 990px){
        font-size: 105px;
    }
`

function Admin(props) {
    const history = useHistory();

    /* Log off as admin and return to home page*/
    const logout = useCallback(() => {
        const logOutPrompt = window.confirm("Are you sure that you want to log out?");
        if (!logOutPrompt) {
            setTimeout(() => history.goBack(), 0)
            return;
        }
        removeCookies();
        props.logOut();
        props.showNav(false);
    }, [props, history]);

    /* Remove access token from browser cookies */
    const removeCookies = () => {
        (new WebCookies()).removeCookies();
    }

    /* Display dedicated navbar options for admin */
    const changeNavToAdmin = useCallback(() => {
        const adminNav = [
            { name: "Delivery", path: "/admin/deliveries" },
            { name: "Stock Management", path: "/admin/stocks" },
            { name: "Sells", path: "/admin/sells" },
            { name: "Contact", path: "/admin/contact" },
            { name: "Predict Price", path: "/admin/ml-price" },
            { name: "Logout", click: logout, path: "/admin" }
        ];
        props.changeContent(adminNav)
        props.showNav(true)
    }, [props, logout]);

    useEffect(() => {
        changeNavToAdmin()
    }, [changeNavToAdmin]);

    return (
        <React.Fragment>
            <RouterComponent
                routing="Admin"
                relUrl={props.match.url}
            />
        </React.Fragment>
    );
}

export const AdminHomeWelcome = () => {
    return <AdminWelcome>Welcome, admin!</AdminWelcome>;
}

const mapDispatchToProps = (dispatch) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));

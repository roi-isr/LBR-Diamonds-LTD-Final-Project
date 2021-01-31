/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux'
import { change_content, change_visiblity, log_out } from '../../store/actions/index'
import { WebCookies } from '../../Entities/Cookies';
import Stock from "../StockTable/jsx/StockTable"
import BasicTable from '../StockTable/jsx/StockTable';
import SellTable from "../SellTable/SellTable";
import DataTable from '../DeliveryCheck/jsx/DeliveryFile'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import RouterComponent from '../../Routers/Router'

function Admin(props) {
    /* Log off as admin and return to home page*/
    const logout = useCallback(() => {
        const logOutPrompt = window.confirm("Are you sure that you want to log out?");
        if (!logOutPrompt)
            return;
        removeCookies();
        props.logOut();
        props.showNav(false);
    }, [props]);

    /* Remove access token from browser cookies */
    const removeCookies = () => {
        const cookies = new WebCookies("tokenStr");
        cookies.removeCookies();
    }

    /* Display dedicated navbar options for admin */
    const changeNavToAdmin = useCallback(() => {
        const adminNav = [
           
            { name: "Delivery", path: "/admin/delivery" },
            { name: "Sells", path: "/admin/sell" },
            { name: "Stock management", path: "/admin/reports" },
            { name: "Logout", click: logout }
        ];
        props.changeContent(adminNav)
        props.showNav(true)
    }, [props, logout]);

    useEffect(() => {
        changeNavToAdmin()
    }, [changeNavToAdmin]);

    return (
        <React.Fragment>
            <RouterComponent routing="Admin" />
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

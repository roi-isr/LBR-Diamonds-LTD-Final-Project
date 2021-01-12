/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux'
import { change_content, change_visiblity, log_out } from '../../store/actions/index'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { WebCookies } from '../../Entities/Cookies';
import stock from "../StockTable/StockTable"
import BasicTable from '../StockTable/StockTable';
import SellTable from "../SellTable/SellTable";
import DataTable from '../DeliveryCheck/DeliveryFile'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AdminRouter from '../../Routers/AdminRouter'

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
        console.log("Hfgh")
        const adminNav =
            
        [ { name: "התנתק", click: logout },
        { name: "מעקב משלוחים", path: "/admin/delivery" }
           ,
            { name: "מכירות", path: "/admin/sell" },
           , { name: "ניהול מלאי", path: "/admin/reports" }
           ];
        props.changeContent(adminNav)
        props.showNav(true)
    }, [props, logout]);

    useEffect(() => {
        changeNavToAdmin()
    }, [changeNavToAdmin]);

    return (
        <React.Fragment>
            <AdminRouter/>
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

/* This component defines the whole admin's sub-platform of our site. */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux'
import { change_content, change_visiblity, log_out } from '../../store/actions/index'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
<<<<<<< HEAD
import DataTable from '../DeliveryCheck/DeliveryFile'
import { WebCookies } from '../../Entities/Cookies';
import Stock from "../StockTable/StockTable"
import BasicTable from '../StockTable/StockTable';
=======
import {WebCookies} from '../../Entities/Cookies';
import stock from "../Stock-table/stock-table"
import BasicTable from '../Stock-table/stock-table';
import DataTable from '../Delivery-check/Delivery-file'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

>>>>>>> design-table

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
<<<<<<< HEAD
    const changeNavToAdmin = useCallback(() => {
        console.log("Hfgh")
        const adminNav =
            [{ name: "Reports", path: "/reports" },
            { name: "Logout", click: logout }];
=======
    const changeNavToAdmin = () => {
        const adminNav = [{ name: "התנתק", click: logout },{ name: "מעקב משלוחים", path: "/reports" },{ name: "מכירות", path: "/reports" },{ name: "ניהול מלאי", path: "/reports" }]
>>>>>>> design-table
        props.changeContent(adminNav)
        props.showNav(true)
    }, [props, logout]);

    useEffect(() => {
        changeNavToAdmin()
    }, [changeNavToAdmin]);

    return (
        <React.Fragment>
            {props.isLoggedIn ?
<<<<<<< HEAD
                <DataTable />
=======
             <BasicTable/>
>>>>>>> design-table
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

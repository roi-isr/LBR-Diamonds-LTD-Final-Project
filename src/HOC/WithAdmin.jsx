import React, { useEffect } from 'react';
import { change_visiblity, update_login_stat } from '../store/actions/index'
import { connect } from 'react-redux';
import {WebCookies} from '../Entities/Cookies'

function WithAdmin(props) {
    useEffect(() => {
        props.hide_nav()
        if (!props.isLoggedIn)
            getTokenFromCookies()
    }, [])

    /* Get access token from cookies, in case of a page refresh */
    const getTokenFromCookies = () => {
        const cookies = new WebCookies("tokenStr");
        const token = cookies.createCookies();
        props.updateLoginStat(token);
    }
    return (
        <React.Fragment>
            {props.isLoggedIn ?
                props.children[1] :
                props.children[0]
            }
        </React.Fragment>
    );
}

const mapDispatchToProp = (dispatch) => {
    return {
        hide_nav: () => dispatch(change_visiblity(false)),
        updateLoginStat: (token) => dispatch(update_login_stat(token))
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.tokenSaver.isLoggedIn
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(WithAdmin);

import React, { useEffect } from 'react';
import { change_visiblity, update_login_stat } from '../store/actions/index'
import { connect } from 'react-redux';
import { WebCookies } from '../Entities/Cookies'

function WithAdmin(props) {

    /* Get access token from cookies, in case of a page refresh */
    useEffect(() => {
        if (props.isLoggedIn) {
            return;
        }
        const getTokenFromCookies = () => {
            const cookies = new WebCookies();
            const refreshToken = cookies.getRefreshToken();
            if (refreshToken) {
                props.refreshToken(refreshToken);
            }
        }
        props.hideNav();
        getTokenFromCookies();

    }, [props]);

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
        hideNav: () => dispatch(change_visiblity(false)),
        refreshToken: (refreshToken) => dispatch(update_login_stat(refreshToken))
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.tokenSaver.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(WithAdmin);

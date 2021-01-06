import React, { useEffect } from 'react';
import SignInSide from '../../MaterialUI_code/sign-in-side/SignInSide';
import { change_content, change_visiblity } from '../../store/actions/actions'
import { connect } from 'react-redux'

const SigninForm = (props) => {
    useEffect(() => {
        props.hide_nav()
    }, [])
    return (
        <SignInSide />
    );
}

const mapDispatchToProp = (dispatch) => {
    return {
        hide_nav: () => dispatch(change_visiblity(false))
    }
}

export default connect(null, mapDispatchToProp)(SigninForm);

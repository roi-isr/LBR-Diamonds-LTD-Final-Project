/* Define the actions types for the reduces */ 
export const CHANGE_NAV="CHANGE_NAV"
export const VIS_NAV="VIS_NAV"
export const SAVE_TOKEN="SAVE_TOKEN"
export const UPDATE_LOGIN_STAT="UPDATE_LOGIN_STAT"

export const change_content = (val) =>{
    return{
        type: CHANGE_NAV,
        value: val
    }
}

export const change_visiblity = (val) =>{
    return{
        type: VIS_NAV,
        value: val
    }
}

export const save_token = (val) =>{
    return{
        type: SAVE_TOKEN,
        value: val
    }
}

export const update_login_stat = (val) =>{
    return{
        type: UPDATE_LOGIN_STAT,
        value: val
    }
}

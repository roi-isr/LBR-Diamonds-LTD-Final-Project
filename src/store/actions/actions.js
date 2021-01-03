/* Define the actions types for the reduces */ 
export const CHANGE_NAV="CHANGE_NAV"
export const VIS_NAV="VIS_NAV"

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

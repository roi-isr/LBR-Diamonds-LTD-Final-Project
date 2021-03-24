import { CHANGE_NAV, VIS_NAV } from './actionTypes';

/* Change site navbar content */
export const change_content = (val) => {
    return {
        type: CHANGE_NAV,
        value: val
    }
}

/* Save tokens for continous admin sessions */
export const change_visiblity = (val) => {
    return {
        type: VIS_NAV,
        value: val
    }
}

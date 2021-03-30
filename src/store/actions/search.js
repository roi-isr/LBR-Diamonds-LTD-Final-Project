import { SET_SEARCH_VISIBLE, UPDATE_SEARCH_STRING } from './actionTypes';

export const set_search_bar_visible = val => {
    return {
        type: SET_SEARCH_VISIBLE,
        value: val
    }
}

export const update_search_str = val => {
    return {
        type: UPDATE_SEARCH_STRING,
        value: val
    }
}

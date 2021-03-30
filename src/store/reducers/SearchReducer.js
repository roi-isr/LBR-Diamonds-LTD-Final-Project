import { SET_SEARCH_VISIBLE, UPDATE_SEARCH_STRING } from "../actions/actionTypes";
import { updateState } from '../utility';

const initialState = {
    searchStr: "",
    isVisible: false
}

/* Managing the search reducer (redux's global state)*/
const search_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_VISIBLE:
            return updateState(state, { isVisible: action.value });
        case UPDATE_SEARCH_STRING:
            return updateState(state, { searchStr: action.value });
        default:
            return state;
    }
}

export default search_reducer;
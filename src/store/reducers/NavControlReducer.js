import { VIS_NAV, CHANGE_NAV } from "../actions/actionTypes";
import paths from '../../Routers/paths.json';
import { updateState } from '../utility';

const initialState = {
    visible: true,
    content: paths["home_paths"]
}

/* Managing the nav reducer (redux's global state)*/
const nav_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VIS_NAV:
            return updateState(state, { visible: action.value });
        case CHANGE_NAV:
            return updateState(state, { content: action.value.slice() });
        default:
            return state;
    }
}

export default nav_reducer;
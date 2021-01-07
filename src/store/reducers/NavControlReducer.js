import { VIS_NAV, CHANGE_NAV } from "../actions/actions";
import paths from '../../Routers/paths.json'
const initialState = {
    visible: true,
    content: paths["home_paths"]
}
/*  <Route path="/" exact><Homepage /></Route>
          <Route path="/home"><Homepage /></Route>
          <Route path="/store"><Store /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/qa"><QA /></Route>
          <Route path="/contact"><Contact /></Route>
          <Route path="/admin"><Sign /></Route>*/
const nav_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VIS_NAV:
            // console.log(paths["home_paths"]);
            return { ...state, visible: action.value }
        case CHANGE_NAV:
            return { ...state, content: action.value.slice() }
        default:
            return state;
    }
}

export default nav_reducer;
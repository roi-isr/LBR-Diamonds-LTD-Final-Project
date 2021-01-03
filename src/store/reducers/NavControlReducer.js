import * as actionTypes from "../actions/actions";

const initialState = {
    visible: true,
    content: [{name:"Home", path:'/home'}]
}
/*  <Route path="/" exact><Homepage /></Route>
          <Route path="/home"><Homepage /></Route>
          <Route path="/store"><Store /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/qa"><QA /></Route>
          <Route path="/contact"><Contact /></Route>
          <Route path="/admin"><Sign /></Route>*/
const nav_reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.VIS_NAV:
            return {...state, visible: action.value.visiblity}
        case actionTypes.CHANGE_NAV:
            return {...state, content: action.value.contentArr.slice()}
        default:
            return state;
    }
}

export default nav_reducer;
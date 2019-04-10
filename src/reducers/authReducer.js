import {GET_TOKEN} from "../actions/authAction";

const initState = {
    accessToken: "",
    success: false
}

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return action.payload || initState;
        default:
            return state;
    }
}

export default authReducer;
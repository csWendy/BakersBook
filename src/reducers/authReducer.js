import {GET_TOKEN,DEL_TOKEN} from "../actions/authAction";

const initState = {
    accessToken: "",
    success: false
}

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return action.payload || initState;
        case DEL_TOKEN:
            return { accessToken: "",
                    success: false};
        default:
            return state;
    }
}

export default authReducer;
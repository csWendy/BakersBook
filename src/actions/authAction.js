import axios from 'axios';
export const GET_TOKEN = 'get_token';

export const getToken = (responseData) => {
    return {
        type: GET_TOKEN,
        payload: {
            accessToken: responseData.accessToken,
            success: responseData.success
        }
    };
};
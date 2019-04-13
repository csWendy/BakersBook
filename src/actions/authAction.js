export const GET_TOKEN = 'get_token';
export const DEL_TOKEN = 'del_token';

export const getToken = (responseData) => {
    return {
        type: GET_TOKEN,
        payload: {
            accessToken: responseData.accessToken,
            success: responseData.success
        }
    };
};
export const delToken = () => {
    return {
        type: DEL_TOKEN
    };
};
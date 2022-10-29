export const ADD_TOAST = 'add_toast';

export const addToast = (data) => {
    console.log('addToast data', data);
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_TOAST,
            payload: data
        });
    }
}
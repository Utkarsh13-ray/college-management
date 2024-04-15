import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    deleteRequest,
    deleteSuccess,
    deleteFailed,
    deleteError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteNotice = (noticeId, address) => async (dispatch) => {
    dispatch(deleteRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${noticeId}`);
        if (result.data.message) {
            dispatch(deleteFailed(result.data.message));
        } else {
            dispatch(deleteSuccess());
        }
    } catch (error) {
        dispatch(deleteError(error));
    }
}

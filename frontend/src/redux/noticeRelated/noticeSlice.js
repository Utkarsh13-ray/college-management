import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noticesList: [],
    loading: false,
    error: null,
    response: null,
};

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.noticesList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteRequest: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = "Notice deleted successfully"; // Set your success message here
        },
        deleteFailed: (state, action) => {
            state.loading = false;
            state.error = null;
            state.response = action.payload; // Set your error message here
        },
        deleteError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    deleteRequest,
    deleteSuccess,
    deleteFailed,
    deleteError
} = noticeSlice.actions;

export const noticeReducer = noticeSlice.reducer;

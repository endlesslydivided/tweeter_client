import {createSlice} from '@reduxjs/toolkit';


export const authSlice:any = createSlice({
    initialState: {user: null},
    name: 'authSlice',
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload;
            return {user};
        },
        logOut: () => authSlice.getInitialState()
    },
});

export const {logOut, setCredentials} = authSlice.actions;

export default authSlice.reducer;


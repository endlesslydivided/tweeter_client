import {createSlice} from '@reduxjs/toolkit';


export const authSlice:any = createSlice({
    initialState: {user: null},
    name: 'authSlice',
    reducers: {
        setCredentials: (state:any, action:any) => {
            const user:any = action.payload;
            return {user};
        },
        incrementFollowers:(state:any,action:any) =>
        {
            return {...state,userCounts:{...state?.userCounts,followersCount:(Number.parseInt(state?.userCounts?.followersCount) + 1).toString()}};
        },
        decrementFollowers:(state:any,action:any) =>
        {
            return {...state,userCounts:{...state?.userCounts,followersCount:(Number.parseInt(state?.userCounts?.followersCount) - 1 ).toString()}};
        },
        logOut: () => authSlice.getInitialState()
    },
});

export const {
    logOut, 
    setCredentials,
    incrementFollowers:incrementCurrentUserFollowers,
    decrementFollowers:decrementCurrentUserFollowers
} = authSlice.actions;

export default authSlice.reducer;


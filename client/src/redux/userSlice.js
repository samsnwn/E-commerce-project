import {createSlice} from '@reduxjs/toolkit'

const userInitialState = {
    currentUser: null,
    isFetching: false,
    error: false,
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        loginStart(state) {
            state.isFetching=true
        },
        loginSuccess(state, action) {
            state.isFetching=false;
            state.currentUser=action.payload
            state.isLoggedIn=true
        },
        loginFailure(state) {
            state.isFetching=false;
            state.error=true
        },
        logout(state) {
            state.isLoggedIn=false
            state.currentUser=null
        }
    }
})


export const userActions = userSlice.actions
export default userSlice.reducer
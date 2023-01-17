import {createSlice} from '@reduxjs/toolkit'

const userInitialState = {
    currentUser: null,
    isFetching: false,
    error: false
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
        },
        loginFailure(state) {
            state.isFetching=false;
            state.error=true
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer
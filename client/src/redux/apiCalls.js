import baseUrl from "../config/config"
import {userActions} from "../redux/userSlice"

export const login = async (dispatch, user) => {
    dispatch(userActions.loginStart())
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, user)
        console.log(res)
        dispatch(userActions.loginSuccess(res.data))
    } catch (err) {
        dispatch(userActions.loginFailure())
    }
}
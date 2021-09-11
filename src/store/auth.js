import {createSlice} from '@reduxjs/toolkit'


const initialState = {emailError: '', passError: '', loader: false, user: localStorage.getItem('user') || null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmailError(state, action) {
            state.emailError = action.payload
        },
        setPassError(state, action){
            state.passError = action.payload
        },
        setLoader(state, action){
            state.loader = action.payload
        },
        setUser(state, action){
            state.user = action.payload
        },
        logoutUser(state){
            state.user = null
        }
    }
})


export const authActions = authSlice.actions

export default authSlice.reducer


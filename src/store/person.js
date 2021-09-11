import {createSlice} from '@reduxjs/toolkit'


const initialState = {person: null}

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPerson(state, action){
            state.person = action.payload
        }
    }
})


export const personActions = personSlice.actions

export default personSlice.reducer


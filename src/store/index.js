import { configureStore } from '@reduxjs/toolkit'; 

import authReducer from './auth'
import personReducer from './person'

const store = configureStore({
    reducer: {auth: authReducer, person: personReducer}
})

export default store
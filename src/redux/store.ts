import {combineReducers, configureStore, createSlice} from 'redux-starter-kit';
import auth from './auth/index';




const rootReducer = combineReducers({
    auth: auth.reducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
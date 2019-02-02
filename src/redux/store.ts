import { combineReducers, configureStore, createSlice } from 'redux-starter-kit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import auth from './auth/reducer';
import { createBrowserHistory, History } from 'history';
import thunk from 'redux-thunk';

const createRootReducer = (history: History) =>
	combineReducers({
		auth: auth.reducer,
		router: connectRouter(history)
	});

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;

export const history = createBrowserHistory();

const store = configureStore({
	reducer: createRootReducer(history),
	middleware: [ thunk, routerMiddleware(history) ]
});

export default store;

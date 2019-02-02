import { FirebaseError, User } from 'firebase';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import { AuthState, FbUser } from './types';

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null
};

const auth = createSlice({
	slice: 'auth',
	initialState,
	reducers: {
		loadUser: (state, action: PayloadAction<FbUser>) => ({ ...state, user: action.payload }),
		signupRequest: (state) => ({ ...state, loading: true }),
		signupSuccess: (state, action: PayloadAction<FbUser>) => ({
			...state,
			loading: false,
			error: null,
			user: action.payload
		}),
		signupFailure: (state, action: PayloadAction<FirebaseError>) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		sendActivationMailRequest: (state) => ({ ...state, loading: true }),
		sendActivationMailSuccess: (state) => ({ ...state, loading: false, error: null }),
		sendActivationMailFailure: (state, action: PayloadAction<FirebaseError>) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		addUserToDbRequest: (state) => ({ ...state, loading: true }),
		addUserToDbSuccess: (state) => ({ ...state, loading: false, error: null }),
		addUserToDbFailure: (state, action: PayloadAction<FirebaseError>) => ({
			...state,
			loading: false,
			error: action.payload
		})
	}
});

export default auth;

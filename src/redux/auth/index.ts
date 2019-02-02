import { FirebaseError, User } from 'firebase';
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type SignupPayload = {
	email: string;
	password: string;
};

export type AuthState = {
	user: FbUser | null;
	loading: boolean;
	error: FirebaseError | null;
};

export type FbUser = {
    emailVerified: boolean,
    email: string,
    uid: string

}

const auth = createSlice({
	slice: 'auth',
	initialState: {
		user: null,
		loading: false,
		error: null
	} as AuthState,
	reducers: {
		signupRequest: (state ) => ({ ...state, loading: true }),
		signupSuccess: (state, action: PayloadAction<FbUser>) => ({
			...state,
			loading: false,
			error: null,
			user: action.payload
		}),
		signupError: (state, action: PayloadAction<FirebaseError>) => ({
			...state,
			loading: false,
			error: action.payload
		})
	}
});

export default auth;

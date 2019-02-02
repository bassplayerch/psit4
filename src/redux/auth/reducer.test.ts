import auth from './reducer';
import { AuthState, FbUser } from './types';
import { FirebaseError } from 'firebase';

const { actions, reducer } = auth;

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null
};

const error: FirebaseError = { code: 'aa', message: 'error', name: 'asdas' };

describe('Auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '', payload: '' })).toEqual(initialState);
	});

	describe('Signup', () => {
		it('should handle a signup request', () => {
			expect(reducer(initialState, actions.signupRequest())).toEqual({ user: null, loading: true, error: null });
		});

		it('should handle a signup success', () => {
			const user: FbUser = { email: 'as', emailVerified: false, uid: '12312' };
			expect(reducer(initialState, actions.signupSuccess(user))).toEqual({ user, loading: false, error: null });
		});

		it('should handle a signup failure', () => {
			expect(reducer(initialState, actions.signupFailure(error))).toEqual({ user: null, loading: false, error });
		});
	});

	describe('Send activation mail', () => {
		it('should handle a sendActivation mail request', () => {
			expect(reducer(initialState, actions.sendActivationMailRequest())).toEqual({
				user: null,
				loading: true,
				error: null
			});
		});

		it('should handle a sendActivation mail success', () => {
			expect(reducer(initialState, actions.sendActivationMailSuccess())).toEqual({
				user: null,
				loading: false,
				error: null
			});
		});

		it('should handle a sendActivation mail request', () => {
			expect(reducer(initialState, actions.sendActivationMailFailure(error))).toEqual({
				user: null,
				loading: false,
				error
			});
		});
	});

	describe('add user to db', () => {
		it('should handle a add user to db request', () => {
			expect(reducer(initialState, actions.addUserToDbRequest())).toEqual({
				user: null,
				loading: true,
				error: null
			});
		});

		it('should handle a add user to db success', () => {
			expect(reducer(initialState, actions.addUserToDbSuccess())).toEqual({
				user: null,
				loading: false,
				error: null
			});
		});

		it('should handle a add user to db request', () => {
			expect(reducer(initialState, actions.addUserToDbFailure(error))).toEqual({
				user: null,
				loading: false,
				error
			});
		});
	});
});

import { Dispatch } from 'redux';
import { fbAuth, db } from '../../firebase';
import auth from './reducer';
import { SignupPayload, FbUser } from './types';
import { Collections } from '../../constants/collections';

export function signup({ email, password }: SignupPayload) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(auth.actions.signupRequest());
			const fbUser = await fbAuth.createUserWithEmailAndPassword(email, password);
			if (fbUser.user) {
				const { user } = fbUser;
				const newUser = {
					email: user.email || '',
					emailVerified: user.emailVerified,
					uid: user.uid
				};
				dispatch(auth.actions.signupSuccess(newUser));
				sendActivationMail(user)(dispatch);
				addUserToDb(newUser)(dispatch);
			}
		} catch (err) {
			dispatch(auth.actions.signupFailure(err));
		}
	};
}

export function sendActivationMail(user: firebase.User) {
	return async (dispatch: Dispatch) => {
		dispatch(auth.actions.sendActivationMailRequest());
		await user.sendEmailVerification().catch((err) => dispatch(auth.actions.sendActivationMailFailure(err)));
		dispatch(auth.actions.sendActivationMailSuccess());
	};
}

export function addUserToDb({email, emailVerified, uid}: FbUser) {
	return async (dispatch: Dispatch) => {
		dispatch(auth.actions.addUserToDbRequest());
        await db.collection(Collections.USERS).doc(uid).set({email, emailVerified}).catch((err) => dispatch(auth.actions.addUserToDbFailure(err)));
        dispatch(auth.actions.addUserToDbSuccess());
	};
}

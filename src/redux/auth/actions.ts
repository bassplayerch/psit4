import { Dispatch } from 'redux';
import { fbAuth } from '../../firebase';
import auth, { SignupPayload } from './index';

export function signup({ email, password }: SignupPayload) {
	return (dispatch: Dispatch) => {
		dispatch(auth.actions.signupRequest());
		fbAuth
			.createUserWithEmailAndPassword(email, password)
			.then((u) => {
				if (u.user) {
					dispatch(
						auth.actions.signupSuccess({
							email: u.user.email || '',
							emailVerified: u.user.emailVerified,
							uid: u.user.uid
						})
					);
				}
			})
			.catch((err) => dispatch(auth.actions.signupError(err)));
	};
}

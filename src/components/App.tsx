import React, { Component, FunctionComponent, useEffect } from 'react';
import SignupPage from './SignupPage/SignupPage';
import { fbAuth } from '../firebase';
import { FbUser } from '../redux/auth/types';
import { Dispatch } from 'redux';
import auth from './../redux/auth/reducer';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { FirebaseError } from 'firebase';
import { Switch, Route } from 'react-router';
import { Routes } from '../constants/routes';
import ActivateEmailPage from './ActivateEmailPage/ActivateEmailPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';

type AppProps = {
	loadUser: (user: FbUser) => void;
	loading: boolean;
	error: FirebaseError | null;
	user: FbUser | null;
};

const App: FunctionComponent<AppProps> = ({ loadUser, loading, user: currentUser, error }) => {

	useEffect(() => {
		const unsubscribe = fbAuth.onAuthStateChanged((user) => {
			if (user) {
				const { email, uid, emailVerified } = user;
				loadUser({ email: email!, emailVerified, uid });
			}
		});
		return () => unsubscribe();
	}, []);

	function renderPage() {
		if (loading) {
			return <div>loading...</div>
		}
		if (currentUser) {
			if (currentUser.emailVerified) {
				return <HomePage />
			} else {
				return <ActivateEmailPage />;
			}
		}
		return (
			<Switch>
				<Route exact path={Routes.HOME} component={SignupPage}/>
				<Route path={Routes.LOGIN} component={LoginPage}/>
			</Switch>
		)

	}



	return (
		<>
			{renderPage()}
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	loading: state.auth.loading,
	error: state.auth.error,
	user: state.auth.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
	loadUser: (user: FbUser) => dispatch(auth.actions.loadUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

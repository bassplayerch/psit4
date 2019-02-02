import React, { SyntheticEvent, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { signup } from '../../redux/auth/actions';
import { SignupPayload } from '../../redux/auth/types';
import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes';

type SignupPageProps = {
    signup: (data: SignupPayload) => void;
}

const SignupPage: FunctionComponent<SignupPageProps> = ({ signup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignup(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        signup({ email, password })
    }

    return (
        <>
            <h1>Sign Up Page</h1>
            <form onSubmit={handleSignup}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                <br/>
                <button type="submit">Sign up</button>
            </form>
            <Link to={Routes.LOGIN}>Signup</Link>
        </>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    signup: (data: SignupPayload) => dispatch(signup(data))
})

export default connect(null, mapDispatchToProps)(SignupPage);
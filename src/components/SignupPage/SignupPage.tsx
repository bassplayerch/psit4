import React, { SyntheticEvent, FunctionComponent, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SignupPayload } from '../../redux/auth';
import { signup } from '../../redux/auth/actions';

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
            <form onSubmit={handleSignup}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                <button type="submit">Sign up</button>
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    signup: (data: SignupPayload) => dispatch(signup(data))
})

export default connect(null, mapDispatchToProps)(SignupPage);
import { FirebaseError } from "firebase";

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

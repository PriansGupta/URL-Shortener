import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../Auth/firebase';

const Login = (props) => {
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Logged in successfully', result.user);
                props.onLogin(true);
            })
            .catch((error) => {
                console.error('Error signing in with Google', error);
            });
    };

    return (
        <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="group relative w-full flex bg-black justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-google hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FcGoogle className="h-7 w-7 text-google" />
                            </span>
                            Log in with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

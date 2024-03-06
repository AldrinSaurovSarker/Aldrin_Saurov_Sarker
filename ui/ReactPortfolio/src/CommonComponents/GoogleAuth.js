import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function GoogleAuth({ loggedIn, setLoggedIn, onAuthChange }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const signIn = (response) => {
        const credentialResponseDecoded = jwtDecode(response.credential);
        
        setUser(credentialResponseDecoded.email);
        setLoggedIn(true);

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(credentialResponseDecoded.email));
        
        onAuthChange(true);
    };

    const signOut = () => {
        setUser(null);
        setLoggedIn(false);

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        
        onAuthChange(false);
    };

    return (
        <div>
            {!loggedIn ? (
                <GoogleLogin
                    onSuccess={signIn}
                    onFailure={() => alert("Something went wrong. Try again.")}
                />
            ) : (
                <div className='btn btn-outline-light w-100' onClick={signOut}>Sign Out</div>
            )}
        </div>
    );
}

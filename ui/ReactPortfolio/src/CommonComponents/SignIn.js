import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function GoogleSignIn({ loggedIn, setLoggedIn }) {
    const [user, setUser] = useState("")

    const onSuccess = (response) => {
        setLoggedIn(true)

        const credentialReponseDecoded = jwtDecode(
            response.credential
        )

        console.log(credentialReponseDecoded)
        setUser(credentialReponseDecoded.email)
    }

    const onFailure = (res) => {
        console.log("Failed")
    }

    return (
        <>
            <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </>
    )
}


// https://www.npmjs.com/package/@react-oauth/google


import React from "react";

import { GoogleLogin } from '@react-oauth/google';
import SessionService from "../../services/session.service";
import { SessionKeys } from "../../services/SessionKeys";

const GoogleSignInButton = () => {

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                // save the token to the session storage
                debugger;
                SessionService.getInstance().set(SessionKeys.AuthToken, credentialResponse.credential!);
                window.location.href = "/home";
            }}
            onError={() => {
                alert("TRY AGAIN")
            }}
        />
    );
  };

export default GoogleSignInButton;
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import firebase from 'firebase/app';
import { FirebaseAuth } from 'react-firebaseui';
import 'firebase/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    const { auth } = firebase;
    const { logIn } = this.props;

    this.uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/app',
      signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
      // Terms of service url.
      tosUrl: '/tos',
      callbacks: {
        signInSuccess: () => {
          logIn();
        }
      }
    };
  }

  render() {
    const { user, isSignedIn, logOut } = this.props;
    return (
      <div>
        {isSignedIn ? (
          <Redirect to="/profile" />
        ) : (
          <FirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default Login;

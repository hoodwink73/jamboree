import React, { Component } from "react";
import firebase from "firebase/app";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import User from "./components/User";
import Hello from "./components/Hello";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyANP1rLTYgcapCUlx7isoxmO4GSJs5q5DA",
      authDomain: "jamboree-66ea0.firebaseapp.com",
      databaseURL: "https://jamboree-66ea0.firebaseio.com",
      projectId: "jamboree-66ea0",
      storageBucket: "",
      messagingSenderId: "660629777323"
    };

    firebase.initializeApp(config);

    this.state = {
      signedIn: false,
      user: null
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn() {
    this.setState({
      signedIn: true,
      user: firebase.auth().currentUser
    });
  }

  logOut() {
    const auth = firebase.auth();
    auth.signOut().then(() => {
      this.setState({
        signedIn: false,
        user: null
      });
    });
  }

  componentDidMount() {
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, signedIn: true });
      }
    });
  }

  render() {
    return (
      <div className="app-container">
        <Route
          exact
          path="/"
          render={() => <Hello isSignedIn={this.state.isSignedIn} />}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              isSignedIn={this.state.signedIn}
              user={this.state.user}
              logIn={this.logIn}
              {...props}
            />
          )}
        />
        {/* Protected Route */}
        <Route
          path="/profile"
          render={props => (
            <User
              isSignedIn={this.state.signedIn}
              user={this.state.user}
              logOut={this.logOut}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

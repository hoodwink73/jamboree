import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function Hello({ isSignedIn }) {
  return (
    <div>
      {isSignedIn ? (
        <Redirect to="/user" />
      ) : (
        <div>
          <h1>Hello There</h1>
          <Link to="/login">
            <button>Log in/Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Hello;

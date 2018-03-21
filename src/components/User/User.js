import React from "react";
import { Redirect } from "react-router";

function User({ isSignedIn, user, logOut }) {
  return (
    <div>
      {isSignedIn ? (
        <div>
          <div>{user ? user.displayName : ""}</div>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default User;

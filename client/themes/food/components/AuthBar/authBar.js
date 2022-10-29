import React from "react";
import classes from "Components/AuthBar/authBar.module.css";
import Link from "Components/Link";
import { useAuthBar } from "Talons/AuthBar/useAuthBar";

const AuthBar = (props) => {
  const { onItemClick } = props;
  const { handleSignOut, isSignedIn, __ } = useAuthBar({
    redirectPath: "/",
  });

  return (
    <div className={classes.root}>
      {isSignedIn ? (
        <ul className={classes.list}>
          <li onClick={onItemClick}>
            <Link to="/account">{__("my.account")}</Link>
          </li>

          <li onClick={onItemClick}>
            <Link to="/account/orders">{"My Orders"}</Link>
          </li>

          <li>
            <div className={classes.signOutLink} onClick={handleSignOut}>
              {__("sign.out")}
            </div>
          </li>
        </ul>
      ) : (
        <ul className={classes.list}>
          <li onClick={onItemClick}>
            <Link to="/signIn">{__("sign.in")}</Link>
          </li>
          <li onClick={onItemClick}>
            <Link to="/signUp">{__("sign.up")}</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AuthBar;

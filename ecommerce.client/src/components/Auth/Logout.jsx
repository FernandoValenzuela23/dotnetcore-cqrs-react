import React from "react";
import SessionManager from "./SessionManager";

export const Logout = () => {

    console.log("component did mount for logout");
    SessionManager.removeUserSession();
    window.location.href = "/";

    return (
        <div></div>
    );

}

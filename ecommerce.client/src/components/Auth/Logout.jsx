import React from "react";
import SessionManager from "./SessionManager";

export const Logout = () => {

    SessionManager.removeUserSession();
    window.location.href = "/";

    return (
        <div></div>
    );

}

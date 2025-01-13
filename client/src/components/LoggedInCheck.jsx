import React from "react";
import { useUser } from "./Adult";
import { Link, Outlet, useOutletContext } from "react-router-dom";

function LoggedInCheck(){
    const {signedIn } = useUser();
    const context = useOutletContext();

    if (!signedIn) {
        return (
            <section>
                <p>Please sign in to see all your children</p>
                <Link to='/signin'><button className="submit-button">Sign In</button></Link>
            </section>
        )
    }
    return (
        <>
            <Outlet
                context={context} 
              />
        </>
    )
}

export default LoggedInCheck;
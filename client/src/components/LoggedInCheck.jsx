import React from "react";
import { useUser } from "./Adult";
import { Link, Outlet, useOutletContext } from "react-router-dom";

function LoggedInCheck(){
    const { signedIn } = useUser();
    const context = useOutletContext();

    if (!signedIn) {
        return (
            <section>
                <p>Please sign in or sign up to see all your family's information.</p>
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
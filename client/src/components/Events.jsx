import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./Adult";

function Events() {
    const { isSignedIn } = useUser();

    return (
        <div>
            <h2>My Family's Events</h2>
            <ul className="cards">{ isSignedIn ? 
                <section>
                    <p>All your events here</p>
                </section>
                :
                (
                    <section>
                        <p>Please sign in to see all your families' events.</p>
                        <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    </section>
                )}
            </ul>
        </div>
    )
}

export default Events;
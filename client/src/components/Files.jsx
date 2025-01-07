import React from "react";
import { useUser } from "./Adult";
import { Link } from "react-router-dom";

function Files() {
    const { isSignedIn } = useUser();
    
        return (
            <div>
                <h2>My Child's Files</h2>
                <ul className="cards">{ isSignedIn ? 
                    <section>
                        <p>All your child's files here</p>
                    </section>
                    :
                    (
                        <section>
                            <p>Please sign in to see all your child's files.</p>
                            <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                        </section>
                    )}
                </ul>
            </div>
        )
}

export default Files;
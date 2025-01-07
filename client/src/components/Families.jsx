import React from "react";
import { useUser } from "./Adult";
import { Link } from "react-router-dom";
import ChildCard from "./ChildCard";

function Families() {
    const {user} = useUser();
    const { isSignedIn } = useUser();

    return (
        <div>
            <h2>My Family</h2>
            <ul className="cards">{ isSignedIn ? 
                <ChildCard /> :
                (
                    <section>
                        <p>Please sign in to see all your families</p>
                        <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    </section>
                )}
            </ul>
        </div>
    )
}

export default Families;
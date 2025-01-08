import React, { useContext } from "react";
import { useUser } from "./Adult";
import { Link, useOutletContext, useParams } from "react-router-dom";

function Files() {
    const { signedIn } = useUser();
    const { child } = useOutletContext();
    const {id} = useParams();
    
        return (
            <div>
                <h2>My Child's Files</h2>
                <ul className="cards">{ signedIn ? 
                    <section>
                        <p>All your child's files here</p>
                        <Link to={`/children/${id}`}><button className="submit-button">Back to Child's information</button></Link>
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
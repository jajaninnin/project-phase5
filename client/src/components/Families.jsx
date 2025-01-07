import React from "react";
import { useUser } from "./Adult";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import FamilyCard from './FamilyCard'

function Families() {
    const {user} = useUser();
    const { signedIn } = useUser();
    const { family } = useOutletContext();
    console.log(user, 'user')
    console.log(signedIn, 'issigned')
    return (
        <div>
            <h2>My Family</h2>
            <ul className="cards">{ signedIn ? 
                <FamilyCard 
                    key={family.id}
                    name={family.name}
                    members={family.members}
                /> :
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
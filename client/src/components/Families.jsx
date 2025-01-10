import React from "react";
import { useUser } from "./Adult";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import FamilyCard from './FamilyCard'

function Families() {
    const { signedIn } = useUser();
    const { family } = useOutletContext();
   
    if (family.length < 1) {
        return (
            <div>No families</div>
        )
    }
    return (
        <div>
            <h2>My Family</h2>
            <button className="submit-button">Add a new family</button>
            <ul className="cards">{ signedIn ? 
                (family.map((fam) => (
                    <FamilyCard 
                        key={fam.id}
                        id={fam.id}
                        name={fam.name}
                        adults_member={fam.adults_member}
                        children_member={fam.children_member}
                        invite_code={fam.invite_code}
                    />
                    )
                )) :
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
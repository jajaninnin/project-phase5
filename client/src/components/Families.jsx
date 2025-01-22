import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import FamilyCard from './FamilyCard'

function Families() {
    const { family } = useOutletContext();
   
    return (
        <div>
            <h2>My Family</h2>
            <section className="container-3">
                <Link to='/new-family'><button className="submit-button">Create a new family</button></Link>
                <Link to='/join-a-family'><button className="submit-button">Join a family</button></Link>
            </section>
            <ul className="cards">{ family.length >= 1 ? 
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
                    <section className="container-3">
                        <p>No families found, please join one or create a new family!</p>
                    </section>
                )}
            </ul>
        </div>
    )
}

export default Families;
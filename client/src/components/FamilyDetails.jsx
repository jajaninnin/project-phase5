import React from "react";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";

function FamilyDetails(){
    const { family, setFamily } = useOutletContext();
    const {id} = useParams();
    const navigate = useNavigate();

    const fam = family.find((fam) => fam?.id?.toString() === id.toString());
    if (!fam) {
        return (
            <div className="details">
                <h4>Failed to find family details!</h4>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
            </div>    
        );
    }

    const {name, invite_code, adults_member, children_member} = fam

    function handleRemoveFamily() {
        fetch(`/families/${id}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            const oldFamily = family.filter((fam) => fam?.id?.toString() !== id?.toString());
            setFamily([...oldFamily]);
            window.scrollTo({top: 0}); 
            navigate('/families');
        })
    }
    

    return(
        <div className="details">
            <section className="details-section">
                <h2>{name}</h2>
                <p>Invite Code: {invite_code}</p>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
                <button onClick={handleRemoveFamily} className="submit-button">Remove Family</button>
            </section>
            <section>
                <h3>Adult members:</h3>
                <p>{
                    adults_member.reduce((acc, adult_mem) => {
                        acc.push(`${adult_mem.firstname} ${adult_mem.lastname}`)
                        return acc;
                    }, []).join(', ')}
                </p>
            </section>
            <section>
                <h3>Child members:</h3>
                <p> {
                    children_member.reduce((acc, children_mem) => {
                        acc.push(`${children_mem.firstname} ${children_mem.lastname}`)
                        return acc;
                    }, []).join(', ')}
                </p>
            </section>
            <section>
                <h3>Events</h3>
                <Link to='/events'><button className="submit-button">See all my Events</button></Link>
                <p>Event here</p>
            </section>
        </div>
    )
}

export default FamilyDetails;


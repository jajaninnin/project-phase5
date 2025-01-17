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

    function handleLeaveFamily() {
        fetch(`/leavefamily/${id}`, {
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
            <section className="container-1">
                <h2>{name}</h2>
                <p>Invite Code: {invite_code}</p>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
                <button onClick={handleLeaveFamily}className="submit-button">Leave the family</button>
                <button onClick={handleRemoveFamily} className="submit-button">Delete Family</button>
            </section>
            <section className="container-2">
                <h3>Adult members:</h3>
                {adults_member.map((adult_mem) => (
                    <p key={`adult_${adult_mem.id}`}>{`${adult_mem.firstname} ${adult_mem.lastname} (${adult_mem.role})`}</p>
                ))}
            </section>
            <section className="container-3">
                <h3>Child members:</h3>
                {children_member.map((children_mem) => (
                    <div key={`adult_${children_mem.id}`}>
                        <table>
                            <th>{`${children_mem.firstname} ${children_mem.lastname} (${children_mem.age})`}</th>
                            <th><Link to={`/children/${children_mem.id}`}><button className="submit-button">View Child</button></Link></th>
                        </table>
                    </div>
                ))}
            </section>
            <section className="container-4">
                <h3>Events</h3>
                <Link to='/events'><button className="submit-button">See all my Events</button></Link>
            </section>
        </div>
    )
}

export default FamilyDetails;


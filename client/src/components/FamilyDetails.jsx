import React, {useEffect, useState} from "react";
import { Link, useOutlet, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useUser } from "./Adult";

function FamilyDetails(){
    const { family, setFamily} = useOutletContext();
    const { user, signedIn } = useUser();
    const {id} = useParams();
    const [ isOwner, setIsOwner ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/families/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            if (user?.id?.toString() === data.user_id?.toString()) {
                setIsOwner(true)
            }
        })
    })

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

    function handleRemove() {
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
                <h2>{name} </h2>
                <p>Invite Code: {invite_code}</p>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
                <button onClick={handleRemove} className="submit-button">Remove Family</button>
            </section>
            <section>
                <h3>Adult members:</h3>
                <p>Adult Members: {
                    adults_member.reduce((acc, adult_mem) => {
                        acc.push(`${adult_mem.firstname} ${adult_mem.lastname}`)
                        return acc;
                    }, []).join(', ')}
                </p>
            </section>
            <section>
                <h3>Child members:</h3>
                <p>Child Members: {
                    children_member.reduce((acc, children_mem) => {
                        acc.push(`${children_mem.firstname} ${children_mem.lastname}`)
                        return acc;
                    }, []).join(', ')}
                </p>
            </section>
        </div>
    )
}

export default FamilyDetails;


import React from "react";
import { Link } from "react-router-dom";

function FamilyCard({id, name, adults_member, children_member, invite_code}){
    return(
        <div className="card">
            <h3>{name} Family</h3>
            <p>Invite code: {invite_code}</p>
            <Link to={`/families/${id}`}><button className="submit-button">See more details</button></Link>
        </div>
    )
}

export default FamilyCard;
import React from "react";
import { Link } from "react-router-dom";

function FamilyCard({id, name, adults_member, children_member, invite_code}){
    return(
        <div className="card">
            <ul className="card-ul">
                <li>{name} Family</li>
                <li>Invite code: {invite_code}</li>
            </ul>
            <Link to={`/families/${id}`}><button className="submit-button">See all the members</button></Link>
        </div>
    )
}

export default FamilyCard;
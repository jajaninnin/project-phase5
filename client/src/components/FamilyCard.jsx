import React from "react";
import { Link } from "react-router-dom";

function FamilyCard({id, name, members, invite_code}){
    return(
        <div className="card">
            <ul className="card-ul">
                <li>{name}</li>
                <li>{members}</li>
                <li>{invite_code}</li>
            </ul>
            <Link to={`/families/${id}`}><button className="submit-button">More Details</button></Link>
        </div>
    )
}

export default FamilyCard;
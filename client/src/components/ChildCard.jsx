import React from "react";
import { Link } from "react-router-dom";

function ChildCard({id, image, firstname, lastname, nickname, birthday, age, 
    allergies, meds, topsize, pantssize, dresssize, schoollevel, schoolname, favorites, hates}){
    return(
        <div className="card">
            <img className="card-image" src={image} alt={firstname} />
            <h3>{firstname} {lastname}, {age} </h3>
            <Link to={`/children/${id}`}><button className="card-button">More Details</button></Link>
        </div>
    )
}

export default ChildCard;
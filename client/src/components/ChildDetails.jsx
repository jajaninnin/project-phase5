import React, {useEffect, useState} from "react";
import { Link, useOutlet, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useUser } from "./Adult";

function ChildDetails(){
    const {child, setChild, files, setFiles} = useOutletContext();
    const { user, signedIn } = useUser();
    const {id} = useParams();
    const [ isOwner, setIsOwner ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/check')
        .then((resp) => resp.json())
        .then((data) => {
            const currUserId = data.id
            fetch(`/listing/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (currUserId?.toString() === data.user_id?.toString()) {
                    setIsOwner(true)
                }
            })
        })
    })

    const chld = child.find((chld) => chld?.id?.toString() === id.toString());
    if (!chld) {
        return (
            <div className="details">
                <h4>Failed to find child details!</h4>
            </div>    
        );
    }

    const {image, firstname, lastname, nickname, birthday, age, allergies, meds, topsize, pantssize, dresssize, shoesize, schoollevel, schoolname, favorites, hates} = child

    return(
        <div className="details">
            <section className="details-section">
                <img className="card-image" src={image} alt={firstname} />
                <h2>{firstname} {lastname}, {age} </h2>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Nickname: {nickname}</p>
                <p>Birthday: {birthday}</p>
                <p>Age: {age}</p>
                <p>Allergies: {allergies}</p>
                <p>Medications: {meds}</p>
                <p>Top Size: {topsize}</p>
                <p>Pants Size: {pantssize}</p>
                <p>Dress Size: {dresssize}</p>
                <p>Shoe Size: {shoesize}</p>
                <p>School level: {schoollevel}</p>
                <p>School Name: {schoolname}</p>
                <p>Favorites: {favorites}</p>
                <p>Hates: {hates}</p>
                <Link to='/children'><button className="submit-button">Back to all children</button></Link>
            </section>
        </div>
    )
}

export default ChildDetails;
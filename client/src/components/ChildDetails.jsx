import React, {useEffect, useState} from "react";
import { Link, useOutlet, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useUser } from "./Adult";

function ChildDetails(){
    const {child, setChild} = useOutletContext();
    const { files, setFiles } = useOutletContext();
    const {id} = useParams();
    const [ isOwner, setIsOwner ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/check')
        .then((resp) => resp.json())
        .then((data) => {
            const currUserId = data.id
            fetch(`/children/${id}`)
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
                <Link to='/children'><button className="submit-button">Back to all children</button></Link>
            </div>    
        );
    }

    function handleRemove() {
        fetch(`/children/${id}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            const oldChildren = child.filter((chld) => chld?.id?.toString() !== id?.toString());
            setChild([...oldChildren]);
            window.scrollTo({top: 0}); 
            navigate('/children');
        })
    }
    
    const {image, firstname, lastname, nickname, birthday, age, allergies, meds,
        topsize, pantssize, dresssize, shoesize, schoollevel, schoolname, favorites, hates} = chld
    
    // const {id, filename, filedate} = file

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
                <Link to={`/files/${id}`}><button className="submit-button">See all {firstname}'s files</button></Link>
            </section>
            <section>
                <Link to={`/children/${id}/edit`}><button className="submit-button">Edit Child info</button></Link>
                <button onClick={handleRemove} className="submit-button">Remove Child</button>
            </section>
            {/* <section>
                <h3>My Child's Files</h3>
                <ul>
                    {file.map((files, indx) => (
                        key={`${files.id}_${index}`}
                        filename={files.filename}
                        filedate={files.filedate}
                    ))}
                </ul>
            </section> */}
        </div>
    )
}

export default ChildDetails;
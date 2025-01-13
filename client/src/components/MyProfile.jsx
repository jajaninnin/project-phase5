import React, {Fragment} from "react";
import { useOutletContext } from "react-router-dom";
import { useUser } from "./Adult";

function ChildDetails(){
    const { user } = useUser();
    const { family } = useOutletContext();
    const fams = family.filter(fmly => fmly.adults_member.some(adult_mem => user?.id === adult_mem?.id));
    function handleUserUpdate() {
        fetch(`/my-profile`, {
            method: "PATCH",
            // body: 
        })
        .then((resp) => resp.json())
        .then(() => {
            
        })
    }
    if (!user) {
        return (
            <div className="details">
                No user found!
            </div>
        );
    }
    const { firstname, lastname, role, username, age } = user;
    return(
        <div className="details">
            <section className="details-section">
                <h2>{firstname} {lastname}, {age} </h2>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Nickname: {role}</p>
                <p>Birthday: {username}</p>
                <p>Age: {age}</p>
                { fams.map((fam) => (
                    <Fragment key={fam.id}>
                        <p>Family: {fam.name}</p>
                        <p>Invite Code: {`http://${window.location.host}/join-a-family/${fam.invite_code}`}</p>
                        <br/>
                    </Fragment>  
                ))}
            </section>
        </div>
    )
}

export default ChildDetails;
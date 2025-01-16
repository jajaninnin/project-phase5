import React, { Fragment } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from "./Adult";

function MyProfile(isEdit = false){
    const { user } = useUser();
    const { family } = useOutletContext();

    const fams = family.filter(fmly => fmly.adults_member.some(adult_mem => user?.id === adult_mem?.id));

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
                <p>Role: {role}</p>
                <p>Age: {age}</p>
                <p>Username: {username}</p>
                <Link to='/my-profile/edit'><button className="submit-button">Edit my profile</button></Link>
            </section>
            <section>
                <h3>My Family</h3>
                { fams.map((fam) => (
                    <Fragment key={fam.id}>
                        <div>
                            <p>{fam.name} Family</p>
                            <p>Invite Code: {`http://${window.location.host}/join-a-family/${fam.invite_code}`}</p>
                            <br/>
                            <p>Adults:</p>
                                <div>
                                    <table>
                                        <tr>
                                            <th>Adults</th>
                                            <th>Children</th>
                                        </tr>
                                        {fam.adults_member.map(adult => (
                                        <tr>
                                            <td>{`${adult.firstname} ${adult.lastname}`}</td>
                                        </tr>
                                        ))}
                                        {fam.children_member.map(child => (
                                        <tr>
                                            <td>{`${child.firstname} ${child.lastname}`}</td>
                                        </tr>
                                        ))}
                                    </table>
                                </div>
                        </div>
                    </Fragment>  
                ))}
            </section>
        </div>
    )
}

export default MyProfile;
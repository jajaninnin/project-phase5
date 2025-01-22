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
        <div>
            <section className="container-1">
                <h2>{firstname} {lastname}, {age} </h2>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Role: {role}</p>
                <p>Age: {age}</p>
                <p>Username: {username}</p>
                <Link to='/my-profile/edit'><button className="submit-button">Edit my profile</button></Link>
            </section>
            <section className="container-3">
                <h2>My Family</h2>
            </section>
                { fams.map((fam) => (
                    <Fragment key={fam.id}>
                        <section className="container-2">
                            <h3>{fam.name} Family</h3>
                            <p>Invite Code: {`http://${window.location.host}/join-a-family/${fam.invite_code}`}</p>
                            <br/>
                            <p>Adults:</p>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Adults</th>
                                                <th>Children</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{fam.adults_member.map(adult => (
                                                    <p key={adult.id}>{`${adult.firstname} ${adult.lastname}, ${adult.role}`}</p>
                                                    ))}
                                                </td>
                                                <td>{fam.children_member.map(child => (
                                                    <p key={child.id}>{`${child.firstname} ${child.lastname}, ${child.age}`}</p>
                                                    ))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </section>
                    </Fragment>  
                ))}
        </div>
    )
}

export default MyProfile;
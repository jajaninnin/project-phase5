import React, { Fragment } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from "./Adult";

function MyProfile(isEdit = false){
    const { user } = useUser();
    const { family } = useOutletContext();


    const fams = family.filter(fmly => fmly.adults_member.some(adult_mem => user?.id === adult_mem?.id));
    // console.log(fams.children_member.firstname)
        
    // const initialFormData = {
    //     firstname: user?.firstname || '',
    //     lastname: user?.lastname || '',
    //     age: user?.age || '',
    //     role: user?.role || '',
    //     username: user?.username || '',
    //     password: '',
    // };
    
    // const [ formData, setFormData ] = useState({...initialFormData}); 

    // function handleUserUpdate() {
    //     fetch(`/my-profile/edit`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "Application/JSON",
    //         },
    //         body: JSON.stringify({user_id: user?.id }),
    //     })
    //     .then((resp) => resp.json())
    //     .then((data) => console.log(data))
    // }

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
                        <p>{fam.name} Family</p>
                        <p>Invite Code: {`http://${window.location.host}/join-a-family/${fam.invite_code}`}</p>
                        <br/>
                        <p>Adults:</p>
                        {fam.adults_member.map(adult => (
                            <p key={`adult_${adult.id}`}>{`${adult.firstname} ${adult.lastname}`}</p>
                        ))}
                        <br/>
                        <p>Children:</p>
                        {fam.children_member.map(child => (
                            <p key={`child_${child.id}`}>{`${child.firstname} ${child.lastname}`}</p>
                        ))}
                        <br/>
                    </Fragment>  
                ))}
            </section>
        </div>
    )
}

export default MyProfile;
import React, { useState } from "react";
import { useOutletContext, Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "./Adult";

function EditProfile({isEdit = false}) {
    const { user, setUser } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const initialFormData = {
        username: user?.username || '',
        password: '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        age: user?.age || '',
        role: user?.role || '',
    }

    const [ formData, setFormData ] = useState({...initialFormData})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editProfile(formData)
    }

    const editProfile = (currUser) => {
        fetch('/my-profile/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currUser)
        })
        .then((resp) => resp.json())
        .then((currUser) => {
            setUser({...currUser})
            navigate('/my-profile', { replace: true });
        })
        .catch((error) => console.error("Error updating user profile", error));
    }

    return (
        <div>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="firstname">First Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='text'
                                name='firstname'
                                placeholder="User's first name here"
                                minLength="1"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lastname">Last Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='text'
                                name='lastname'
                                placeholder="User's last name here"
                                minLength="1"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="age">Age</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='number'
                                name='age'
                                placeholder="User's age here"
                                min="18"
                                max='99'
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="role">Role</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='text'
                                name='role'
                                placeholder="User's role here"
                                minLength="1"
                                value={formData.role}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='text'
                                name='username'
                                placeholder="Username here"
                                minLength="1"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lastname">Password</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="edit-profile-input"
                                type='password'
                                name='password'
                                placeholder="Password here"
                                minLength="1"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className="submit-button">Submit Changes</button>
                </form>
            </section>
            <section>
                <Link to='/my-profile'><button className="submit-button">Cancel</button></Link>
                <Link to='/my-profile'><button className="submit-button">Back to My Profile</button></Link>
            </section>
        </div>
    )

}

export default EditProfile;
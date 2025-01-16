import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./Adult";

function SignIn() {
    const { setSignedIn, setUser } = useUser(false)
    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {
            username: username,
            password: password
        }
        if(signup) {
            values.firstname = firstname
            values.lastname = lastname
            values.age = age
            values.role = role
        }

        setUsername('')
        setPassword('')
        setAge('')
        setFirstName('')
        setLastName('')
        setRole('')

        const endpoint = signup ? '/signup' : '/login'

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setSignedIn(true);
                    setUser(user);
                    console.log("Login Sucessful.")
                    if(signup) {
                        alert("Account created successfully!")
                        navigate('/')
                    } else {
                        alert("Login Successful!")
                        navigate('/')
                    }
                })
            } else {
                resp.json().then((data) => {
                    console.log('Error:', data.error)
                    alert(`Error: ${data.error}`)
                })
            }
        })
    }

    return (
        <div>
            {signup ? (
                <section>
                    <button className="submit-button" onClick={() => {
                        setSignup(false)
                        setUsername('')
                        setPassword('')
                        setAge('')
                        setFirstName('')
                        setLastName('')
                        }}>I already have an account</button>
                    <h2>Register New User</h2>
                </section>
            ) : (
                <section>
                    <button className="submit-button" onClick={() => {
                        setSignup(true)
                        setUsername('')
                        setPassword('')
                        setAge('')
                        setFirstName('')
                        setLastName('')
                        }}>I want to register an account</button>
                    <h2>Login</h2>
                </section>
            )}
            <section>
                <form className="signin" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor='username'>Username:</label>
                    </div>
                    <div className="col-75">
                        <input 
                            required
                            id='username'
                            name='username'
                            type='text'
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor='password'>Password:</label>
                    </div>
                    <div className="col-75">
                        <input 
                            required
                            id='password'
                            name='password'
                            type='password'
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                    {signup ? (
                        <div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor='name'>First Name:</label>
                                </div>
                                <div className="col-75">
                                    <input 
                                        required
                                        id='name'
                                        name='firstname'
                                        type="text"
                                        placeholder="Your first name"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor='name'>Last Name:</label>
                                </div>
                                <div className="col-75">
                                    <input 
                                        required
                                        id='name'
                                        name='lastname'
                                        type="text"
                                        placeholder="Your last name"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor='age'>Age:</label>
                                </div>
                                <div className="col-75">
                                    <input 
                                    required
                                    id='age'
                                    name='age'
                                    type="number"
                                    placeholder="Your Age"
                                    min="18"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor='name'>Role:</label>
                                </div>
                                <div className="col-75">
                                    <input 
                                        required
                                        id='name'
                                        name='role'
                                        type="text"
                                        placeholder="Your role to the Family"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        ) : null}
                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </section>
        </div>
    )
}

export default SignIn;
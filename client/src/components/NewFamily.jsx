import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function NewFamily() {
    const navigate = useNavigate();
    const { family, setFamily } = useOutletContext();

    const [ name, setName ] = useState('');
    const [ familyCreationError, setFamilyCreationError ] = useState(false);

    const handleSubmitNewFamily = () => {
        fetch('/families', {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({ name: name }),
        })
        .then(resp => resp.json())
        .then((data) => {
            if (!data?.error) {
                setFamilyCreationError(false);
                setFamily([...family, data]);
                navigate('/families');
            } else {
                setFamilyCreationError(true);
                // navigate('/families');
            }
        })
        .catch((error) => {
            setFamilyCreationError(true);
            console.error("Error adding new child", error);
        });
      };

    return (
        <div className="container">
            { familyCreationError && (
                <section>
                    <h2>Failed to create family, please try again!</h2>
                </section>
            )}
            <h2>Create a new family:</h2>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="firstname">Family Name:</label>
                </div>
                <div className="col-75">
                    <input
                        required
                        className="new-child-input"
                        type='text'
                        name='name'
                        placeholder="family name here"
                        minLength="1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <button className="submit-button" onClick={handleSubmitNewFamily}>Create Family</button>
            <Link to={`/families`}><button className="submit-button">Cancel</button></Link>
        </div>
    )
}

export default NewFamily;
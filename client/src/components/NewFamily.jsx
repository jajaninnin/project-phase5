import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function NewFamily() {
    const navigate = useNavigate();
    const { family, setFamily } = useOutletContext();

    const [ name, setName ] = useState('');
    const [ familyCreationError, setFamilyCreationError ] = useState(false);

    const createFamily = () => {
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
                    Failed to create family, please refresh and try again!
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
            <div>
                <button className="submit-button" onClick={createFamily}>Create Family</button>
            </div>
            <Link to={`/families`}><button className="submit-button">Cancel</button></Link>
        </div>
    )
}

export default NewFamily;
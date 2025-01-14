import React, { useState } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";

function Files() {
    const { files, setFiles } = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [ file, setFile ] = useState(undefined);
            
    
    const addFile = () => {
        const data = new FormData();
        data.append('file', file);
        data.append('name', 'file');
        fetch( `/child-files/${id}`, {
            method: "POST",
            body: data
        })
        .then((response) => response.json())
        .then((newfile) => {
            setFiles([...files, newfile]);
            // navigate(`/files/${newfile.id}`);
        })
        .catch((error) => console.error("Error adding new file", error));
        };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addFile();
    };

    return (
        <div>
            <h2>My child's Files</h2>
            <div className="container">
                <section>
                    <p>All your child's files here</p>
                    <Link to={`/children/${id}`}><button className="submit-button">Back to child's information</button></Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="files">File</label>
                        </div>
                        <div className="col-75">
                            <input
                                type='file'
                                name='files'
                                accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => {
                                    if (e?.target?.files?.[0]) {
                                        setFile(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="submit-button">Submit File</button>
                    </div>
                </form>
            </div> 
        </div>
    )
}

export default Files;
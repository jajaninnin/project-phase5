import React, {Fragment, useEffect, useState} from "react";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";

function ChildDetails(){
    const {child, setChild} = useOutletContext();
    const {id} = useParams();
    const [ childFiles, setChildFiles ] = useState(undefined);
    const navigate = useNavigate();
    const [ newFile, setNewFile ] = useState(undefined);

    useEffect(() => {
        fetch(`/child-files/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            setChildFiles(data);
        })
    }, [id]);

    const chld = child.find((chld) => chld?.id?.toString() === id.toString());
    if (!chld) {
        return (
            <div className="details">
                <h4>Failed to find child details!</h4>
                <Link to='/children'><button className="submit-button">Back to all children</button></Link>
            </div>    
        );
    }

    function handleRemoveChild() {
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

    function handleRemoveFile(fileId) {
        fetch(`/child-files/${fileId}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            const oldFile = childFiles.filter((fil) => fil?.id?.toString() !== fileId?.toString());
            setChildFiles([...oldFile]);
            window.scrollTo({top: 0}); 
            // navigate('/children');
        })
    }
              
    const addFile = () => {
        const data = new FormData();
        data.append('file', newFile);
        data.append('name', 'file');
        fetch( `/child-files/${id}`, {
            method: "POST",
            body: data
        })
        .then((response) => response.json())
        .then((newfile) => {
            setChildFiles([...childFiles, newfile]);
            // navigate(`/children/${id}`);
        })
        .catch((error) => console.error("Error adding new file", error));
        };
        
    const handleSubmit = (e) => {
        e.preventDefault();
        addFile();
    };

    const {image, firstname, lastname, nickname, birthday, age, allergies, meds,
        topsize, pantssize, dresssize, shoesize, schoollevel, schoolname, favorites, hates} = chld
    
    return(
        <div className="details">
            <section className="details-section">
                <img className="single-image" src={image} alt={firstname} />
                <h2>{firstname} {lastname}, {age} </h2>
                <table>
                    <tr>
                        <td>First Name</td>
                        <td>{firstname}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{lastname}</td>
                    </tr>
                    <tr>
                        <td>Nickname</td>
                        <td>{nickname}</td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>{birthday}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{age}</td>
                    </tr>
                    <tr>
                        <td>Allergies</td>
                        <td>{allergies}</td>
                    </tr>
                    <tr>
                        <td>Medications</td>
                        <td>{meds}</td>
                    </tr>
                    <tr>
                        <td>Top Size</td>
                        <td>{topsize}</td>
                    </tr>
                    <tr>
                        <td>Pants Size</td>
                        <td>{pantssize}</td>
                    </tr>
                    <tr>
                        <td>Dress Size</td>
                        <td>{dresssize}</td>
                    </tr>
                    <tr>
                        <td>Shoe Size</td>
                        <td>{shoesize}</td>
                    </tr>
                    <tr>
                        <td>School level</td>
                        <td>{schoollevel}</td>
                    </tr>
                    <tr>
                        <td>School Name</td>
                        <td>{schoolname}</td>
                    </tr>
                    <tr>
                        <td>Favorites</td>
                        <td>{favorites}</td>
                    </tr>
                    <tr>
                        <td>Dislikes</td>
                        <td>{hates}</td>
                    </tr>
                </table>
                <Link to='/children'><button className="submit-button">Back to all children</button></Link>
            </section>
            <section>
                <Link to={`/children/${id}/edit`}><button className="submit-button">Edit Child info</button></Link>
                <button onClick={handleRemoveChild} className="submit-button">Remove Child</button>
            </section>
            <section>
                <h3>Add a new file</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="files">File</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                type='file'
                                name='files'
                                accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => {
                                    if (e?.target?.files?.[0]) {
                                        setNewFile(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="submit-button">Submit File</button>
                    </div>
                </form>
            </section>
            <section>
                <h3>{firstname}'s Files</h3>
                <table>
                    <tr>
                        <th>File Name</th>
                        <th>Date Uploaded</th>
                        <th>Open File</th>
                        <th>Delete File</th>
                    </tr>
                    {!!childFiles && childFiles.map((files, index) => (
                        <Fragment key={`${files.id}_${index}`}>
                        <tr>
                            <td>{files.filename}</td>
                            <td>{files.filedate}</td>
                            <td><Link to={`/files/${id}`}>View File</Link></td>
                            <td><button className="submit-button" onClick={() => handleRemoveFile(files.id)}>Delete file</button></td>
                            </tr>
                        </Fragment>
                    ))}
                </table>
            </section>
        </div>
    )
}

export default ChildDetails;
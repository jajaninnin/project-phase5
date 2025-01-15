import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import DocViewer from "@cyntler/react-doc-viewer"

function Files() {
    const [ files, setFiles ] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const currFile = useRef();
    
    useEffect(() => {
        fetch(`/child-files/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            setFiles(data);
            currFile.current = {fileId: data[0].id};
        })
    }, [id]);

    function handleRemoveFile() {
        fetch(`/child-files/${currFile.current.fileId}`, {
            method: "DELETE"
        })
        .then(() => {})
        .then(() => {
            const oldFile = files.filter((fil) => fil?.id?.toString() !== currFile.current?.fileId?.toString());
            if (oldFile.length < 1) {
                navigate(`/children/${id}`);
            }
            setFiles([...oldFile]);
            currFile.current = {fileId: oldFile?.[0]?.id};
            window.scrollTo({top: 0});
        })
    }

    const handleDocumentChange = (doc) => {
        currFile.current = doc;
    };

    const filesForDocViewer = files && files.reduce((acc, file) => {
        acc.push({uri: `${window.location.protocol}//${window.location.host}${file.filename}`, fileId: file.id})
        return acc;
    }, []);

    return (
        <div>
            <h2>My child's Files</h2>
            <section>
                {files && (
                    <DocViewer className="doc-viewer" documents={filesForDocViewer} onDocumentChange={handleDocumentChange} />
                )}
            </section>
            <section>
                <Link to={`/children/${id}`}><button className="submit-button">Back to Child's page</button></Link>
                <button className="submit-button" onClick={() => handleRemoveFile()}>Delete file</button>
            </section>
        </div>
    )
}

export default Files;
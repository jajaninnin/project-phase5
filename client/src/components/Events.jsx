import React, {Fragment, useEffect, useState} from "react";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";

function Events() {
    const {child, setChild} = useOutletContext();
    const {id} = useParams();
    const [ childFiles, setChildFiles ] = useState(undefined);
    const { files, setFiles } = useOutletContext();
    const navigate = useNavigate();
    const [ file, setFile ] = useState(undefined);

    useEffect(() => {
        fetch(`/events`)
        .then((resp) => resp.json())
        .then((data) => {
            setChildFiles(data);
        })
    });

    return (
        <div>
            <h2>My Family's Events</h2>
        </div>
    )
}

export default Events;
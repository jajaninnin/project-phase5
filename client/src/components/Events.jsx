import React, {Fragment, useEffect, useState} from "react";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";

function Events() {
    const {id} = useParams();
    const { events, setEvents } = useOutletContext();
    const navigate = useNavigate();


    return (
        <div>
            <h2>My Family's Events</h2>
        </div>
    )
}

export default Events;
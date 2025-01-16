import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function Events() {
    const { events, setEvents, family } = useOutletContext();
    const navigate = useNavigate();
    
    if (!events) {
        return (
            <div>
                <h3>Failed to find events</h3>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
            </div>
        )
    }
    
    function handleRemoveEvent(eventId) {
        fetch(`/events/${eventId}`, {
            method: "DELETE"
        })
        .then((resp) => resp.json())
        .then((data) => {
            const filteredEvents = events.filter((event) => event?.id?.toString() !== eventId?.toString());
            setEvents([...filteredEvents]);
            window.scrollTo({top: 0}); 
            if (filteredEvents.length < 1) {
                navigate('/');
            }
        })
    }

    return (
        <div className="container">
            <h2>My Family's Events</h2>
            <section>
                <button className="submit-button">Add new event</button>
            </section>
            <table>
                <tr>
                    <th>Event name</th>
                    <th>Event Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Owner</th>
                    <th>Delete Event</th>
                </tr>
                {events.map((evt) => {
                    const owner = family
                        ?.find(fam => fam?.id?.toString() === evt?.family_id?.toString())
                        ?.adults_member
                        ?.find(adult => adult?.id?.toString() === evt?.owner?.toString());
                    return (
                        <tr>
                            <td>{evt.name}</td>
                            <td>{evt.date}</td>
                            <td>{evt.start_time}</td>
                            <td>{evt.end_time}</td>
                            <td>{`${owner?.firstname} ${owner?.lastname}`}</td>
                            <td><button className="submit-button" onClick={() => handleRemoveEvent(evt.id)}>Delete event</button></td>
                        </tr>
                        )
                })}
            </table>
        </div>
    )
}

export default Events;
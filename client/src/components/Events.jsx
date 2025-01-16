import React, { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

function Events() {
    const { events, setEvents, family } = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [ sort, setSort ] = useState('asc');
    
    if (!events) {
        return (
            <div>
                <h3>Failed to find events</h3>
                <Link to='/families'><button className="submit-button">Back to all families</button></Link>
            </div>
        )
    }
    
    console.log(family)

    function handleRemoveEvent(eventId) {
        fetch(`/events/${eventId}`, {
            method: "DELETE"
        })
        .then((resp) => resp.json())
        .then(() => {
            const filteredEvents = events.filter((event) => event?.id?.toString() !== eventId?.toString());
            setEvents([...filteredEvents]);
            window.scrollTo({top: 0}); 
            if (filteredEvents.length < 1) {
                navigate('/');
            }
        })
    }

    const handleSortDate = () => {
        setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'))
    };

    const filteredEvents = events?.sort((a, b) => {
            if (sort === 'asc') {
                return (new Date(a.date).getTime()) - (new Date(b.date).getTime());
            } else {
                return (new Date(b.date).getTime()) - (new Date(a.date).getTime())
            }
        });

    return (
        <div className="container">
            <h2>My Family's Events</h2>
            <section>
                <Link to={`/families/${family.id}`}>Back to Family Details</Link>
            </section>
            <section>
                <button className="submit-button">Add new event</button>
                <button className="submit-button" onClick={handleSortDate}>
                    Sort by Date: {sort === 'asc' ? 'Later to Sooner' : 'Sooner to Later' }
                </button>
            </section>
            <table>
                <thead>
                    <tr>
                        <th>Event name</th>
                        <th>Event Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Owner</th>
                        <th>Delete Event</th>
                    </tr>
                </thead>
                {filteredEvents.map((evt) => {
                    const owner = family
                        ?.find(fam => fam?.id?.toString() === evt?.family_id?.toString())
                        ?.adults_member
                        ?.find(adult => adult?.id?.toString() === evt?.owner?.toString());
                    return (
                        <tr key={evt.id}>
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
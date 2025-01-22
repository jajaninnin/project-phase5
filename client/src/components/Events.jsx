import React, { useState } from "react";
import {  useNavigate, useOutletContext } from "react-router-dom";
import { useUser } from "./Adult";

function Events() {
    const { events, setEvents, family } = useOutletContext();
    const { user } = useUser();
    const navigate = useNavigate();
    const [ sort, setSort ] = useState('asc');

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
    };

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

    const initialFormData = {
        name: '',
        date: '',
        time: '',
    };

    const [ formData, setFormData ] = useState({...initialFormData});

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
                ...formData,
                [name]: value
        });
    };

    const addEvent = () => {
        const familyId = family.find(fam => fam.adults_member.find(adult_mem => adult_mem.id === user.id))?.id;
        fetch( `/events`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({...formData, owner: user.id, family_id: familyId})
        })
        .then((response) => response.json())
        .then((newEvent) => {
            setEvents([...events, newEvent]);
            setFormData({...initialFormData})
        })
        .catch((error) => console.error("Error adding new event", error));
        };
        
    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent(formData);
    };

    return (
        <div>
            <h2>My Family's Events</h2>
            <section className="container-2">
                <h3>New Event Form</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-event-input"
                                type='text'
                                name='name'
                                placeholder="Event name here"
                                minLength="1"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-event-input"
                                type='date'
                                name='date'
                                minLength="1"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-event-input"
                                type='time'
                                name='time'
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className="submit-button">Submit new event</button>
                </form>
            </section>
            <section className="container-3">
                 <button className="submit-button" onClick={handleSortDate}>
                    Sort by Date: {sort === 'asc' ? 'Later to Sooner' : 'Sooner to Later' }
                </button>
            </section>
            <section className="container-4">
            <table>
                <thead>
                    <tr>
                        <th>Event name</th>
                        <th>Event Date</th>
                        <th>Time</th>
                        <th>Owner</th>
                        <th>Delete Event</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map((evt) => {
                        const owner = family
                            ?.find(fam => fam?.id?.toString() === evt?.family_id?.toString())
                            ?.adults_member
                            ?.find(adult => adult?.id?.toString() === evt?.owner?.toString());
                        return (
                            <tr key={evt.id}>
                                <td>{evt.name}</td>
                                <td>{evt.date}</td>
                                <td>{evt.time}</td>
                                <td>{`${owner?.firstname} ${owner?.lastname}`}</td>
                                <td><button className="submit-button" onClick={() => handleRemoveEvent(evt.id)}>Delete event</button></td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
            </section>
        </div>
    )
}

export default Events;
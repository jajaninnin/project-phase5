import React, { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

function Events() {
    const { events, setEvents, family, user} = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [ sort, setSort ] = useState('asc');
    const [ newEvent, setNewEvent ] = useState();
    
    // if (!events) {
    //     return (
    //         <div>
    //             <h3>Failed to find events</h3>
    //             <Link to='/families'><button className="submit-button">Back to all families</button></Link>
    //         </div>
    //     )
    // }

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

    const initialFormData = {
        name: events?.firstname || '',
        date: events?.lastname || '',
        start_time: events?.nickname || '',
        end_time: events?.birthday || '',
        owner: events?.owner || user, 
    }

    const [ formData, setFormData ] = useState({...initialFormData});

    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const handleDateChange = (e) => {
        const dateAsJSDate = new Date(e.target.value);
        if (dateAsJSDate instanceof Date && !isNaN(dateAsJSDate)) {
            setDate(e.target.value);
        }
    };

    const handleTimeChange = (e) => {
        const timeFromInput = e.target.value || '';
        const hoursAsInt = parseInt(timeFromInput.substring(0, 2), 10);
        if (hoursAsInt >= 9 && hoursAsInt <= 17) {
            setTime(timeFromInput);
        } 
    }

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
                ...formData,
                [name]: value
        });
    }

    const addEvent = () => {
        fetch( `/events/`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify()
        })
        .then((response) => response.json())
        .then((newEvent) => {
            setEvents([...events, newEvent]);
        })
        .catch((error) => console.error("Error adding new event", error));
        };
        
    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent();
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
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="starttime">Start Time</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-event-input"
                                type='time'
                                name='start_time'
                                value={formData.start_time}
                                onChange={handleTimeChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="endtime">End Time</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-event-input"
                                type='time'
                                name='end_time'
                                value={formData.end_time}
                                onChange={handleTimeChange}
                            />
                        </div>
                    </div>
                    <button className="submit-button">Submit new event</button>
                </form>
            </section>
            <section className="container-3">
                <Link to={`/families/${id}`}>Back to Family Details</Link>
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
            </section>
        </div>
    )
}

export default Events;
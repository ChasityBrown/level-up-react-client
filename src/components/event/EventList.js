import React, { useEffect, useState} from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game.title}</div>
                        <div className="event__description">Description: {event.description} </div>
                        <div>Date: {event.date} Time: {event.time} </div>
                    </section>
                })
            }
        </article>
    )
}
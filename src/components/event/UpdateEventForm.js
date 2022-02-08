import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updateEvent, getEventById} from './EventManager.js'
import { getGames } from "../game/GameManager.js"

export const UpdateEventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        // TODO: Get the event types, then set the state
        getEventById(eventId)
        .then(data => setCurrentEvent({
            game: data.game.id,
            description: data.description,
            date: data.date,
            time: data.time
        }))
        .then(getGames()
        .then(data => setGames(data)))
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function002
        domEvent.preventDefault()
        const copy = {...currentEvent}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__game">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" required className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                    <option value="0">Select a game</option>
                    {
                        games.map(g => (
                            <option key={g.id} value={g.id}>{g.title}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
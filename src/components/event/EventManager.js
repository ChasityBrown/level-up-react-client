export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
     })
        .then(res => res.json())
}
export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`,{
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }})
    .then(res => res.json())
}
export const updateEvent = (event, id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
     })
}
export const deleteEvent = (event, id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(getEvents)
}
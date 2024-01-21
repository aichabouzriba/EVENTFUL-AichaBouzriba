import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'

const Event=({title,description,date,location,onClick,onDelete})=>{
    return(
        <Card className='events'>
            <Card.Body>
                <Card.Title className="event-title">{title}</Card.Title>
                <p className="event-description">{description}</p>
                <p className="event-date">{date}</p>
                <p className="event-location">{location}</p>
                <Button className="update" variant='primary' onClick={onClick}>Update</Button>
                {' '}
                <Button className="delete" variant='danger' onClick={onDelete}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Event
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import Event from './events'
import { Modal,Form,Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const LoggedInHome=()=>{
    const [events,setEvents]=useState([]);
    const [show,setShow]=useState(false);
    const {register,handleSubmit,reset,setValue,formState:{errors}}=useForm()
    const [eventId,setEventId]=useState(0);

    useEffect(
        ()=>{
            fetch('/event/events')
            .then(res=>res.json())
            .then(data=>{
                setEvents(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    const getAllEvents=()=>{
        fetch('/event/events')
        .then(res=>res.json())
        .then(data=>{
            setEvents(data)
        })
        .catch(err=>console.log(err))
    }

    const closeModal=()=>{
        setShow(false)
    }

    const showModal=(id)=>{
        setShow(true)
        setEventId(id)
        events.map(
            (event)=>{
                if(event.id==id){
                    setValue('title',event.title)
                    setValue('description',event.description)
                    setValue('date',event.date)
                    setValue('location',event.location)
                }
            }
        )
    }

    let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const updateEvent=(data)=>{
        console.log(data)

        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }

        fetch(`/event/event/${eventId}`,requestOptions)
        .then(res=>res.json())
        .then(data=>
        {
            console.log(data)
            const reload = window.location.reload()
            reload()
        })
        .catch(err=>console.log(err))
    }

    const deleteEvent=(id)=>{
        console.log(id)

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            },
        }

        fetch(`/event/event/${id}`,requestOptions)
        .then(res=>res.json())
        .then(data=>
        {
            console.log(data)
            getAllEvents()
        })
        .catch(err=>console.log(err))
    }


    return(
        <div className="events-container">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="update-event">Update Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" className="create-input"
                                {...register('title',{required:true})}
                            />
                        { errors.title && errors.title.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Title is required</span>) }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} className="create-input"
                                {...register('description',{required:true,maxLength:200,minLength:5})}
                            />
                        { errors.description && errors.description.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Description is required</span>) }
                        { errors.description && errors.description.type === "minLength" && (<span style={{color:"red",fontSize:"12px"}}>Minimum Description length is 5 characters</span>) }
                        { errors.description && errors.description.type === "maxLength" && (<span style={{color:"red",fontSize:"12px"}}>Maximum Description length is 200 characters</span>) }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" className="create-input"
                                {...register('date',{required:true})}
                            />
                        { errors.date && errors.date.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Date is required</span>) }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" className="create-input"
                                {...register('location',{required:true})}
                            />
                        { errors.location && errors.location.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Location is required</span>) }
                        </Form.Group>

                        <br></br>
                        <Form.Group>
                            <Button className="save" variant="primary" onClick={handleSubmit(updateEvent)}>Save</Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>


            {
                events.map(
                    (event,index)=>(
                        <Event
                        title={event.title}
                        key={index}
                        description={event.description}
                        date={event.date}
                        location={event.location}
                        onClick={()=>{showModal(event.id)}}
                        onDelete={()=>{deleteEvent(event.id)}}
                        />
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome=()=>{

    return(
          <div className="home-container">
            <h1 className="welcome">Welcome to EVENTFUL</h1>
            <p className="slogan">Discover, Create, and Share Unforgettable Moments.</p>
            <Link to='/signup' className='start'>Get Started</Link>
          </div>
    )
}

const HomePage=()=>{

    const [logged]=useAuth()

    return(
        <div>
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
        </div>
    )
}

export default HomePage
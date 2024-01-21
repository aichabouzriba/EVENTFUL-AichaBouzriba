import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'

const CreateEventPage=()=>{

    const inputRef = useRef();

    const handlePlaceChanged =()=>{
        const [place] = inputRef.current.getPlaces()
        if (place) {
            console.log(place.formatted_address)
            console.log(place.geometry.location.lat())
            console.log(place.geometry.location.lng())
        }
    }




    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const [show,setShow]=useState(false);

    const createEvent=(data)=>{
        console.log(data)

            const token= localStorage.getItem('REACT_TOKEN_AUTH_KEY');
            console.log(token)

            const requestOptions={
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'Authorization':`Bearer ${JSON.parse(token)}`
                },
                body:JSON.stringify(data)
            }

            fetch('/event/events',requestOptions)
            .then(res=>res.json())
            .then(data=>{
                reset()
            })
            .catch(err=>console.log(err))

    }

    return(
        <div className="container">
          <div className="createEvent">
            <h1 className="create-title">Create an Event</h1>
            <form >
                <Form.Group>
                    <Form.Label className= "create-label">Title</Form.Label>
                    <Form.Control type="text" className="create-input" placeholder="Enter Event Title"
                        {...register('title',{required:true})}
                    />
                { errors.title && errors.title.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Title is required</span>) }

                </Form.Group>

                <Form.Group>
                    <Form.Label className= "create-label">Description</Form.Label>
                    <Form.Control as="textarea" rows={5} className="create-input" placeholder="Enter Event Description"
                        {...register('description',{required:true,maxLength:200,minLength:5})}
                    />
                { errors.description && errors.description.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Description is required</span>) }
                { errors.description && errors.description.type === "minLength" && (<span style={{color:"red",fontSize:"12px"}}>Minimum Description length is 5 characters</span>) }
                { errors.description && errors.description.type === "maxLength" && (<span style={{color:"red",fontSize:"12px"}}>Maximum Description length is 200 characters</span>) }
                </Form.Group>

                <Form.Group>
                    <Form.Label className= "create-label">Date</Form.Label>
                    <Form.Control type="text" className="create-input" placeholder="Enter Event Date"
                        {...register('date',{required:true})}
                    />
                { errors.date && errors.date.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Date is required</span>) }
                </Form.Group>



                <LoadScript
                    googleMapsApiKey="AIzaSyDHTQOCzFf0zjRx4_5r36fI4w8wZLDzmww"
                    libraries={["places"]}
                >
                    <StandaloneSearchBox
                        onLoad={ref => (inputRef.current=ref)}
                        onPlacesChanged={handlePlaceChanged}
                    >


                        <Form.Group>
                            <Form.Label className= "create-label">Location</Form.Label>
                            <Form.Control type="text" className="create-input" placeholder="Enter Event Location"
                                {...register('location',{required:true})}
                            />
                        { errors.location && errors.location.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Event Location is required</span>) }
                        </Form.Group>

                    </StandaloneSearchBox>
                </LoadScript>

                <br></br>
                <Form.Group>
                    <Button className="save" variant="primary" onClick={handleSubmit(createEvent)}>Save</Button>
                </Form.Group>
            </form>
          </div>
        </div>
    )
}

export default CreateEventPage
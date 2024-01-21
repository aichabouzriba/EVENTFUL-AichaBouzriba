import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../auth'
import { useNavigate } from 'react-router-dom'


const LoginPage=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm()

    const navigate=useNavigate()

    const loginUser=(data)=>{
        console.log(data)

        const requestOptions={
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch('/auth/login',requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log('Server response:', data)

            if (data && data.access_token){
                login(data.access_token)
                navigate('/')
            } else{
                alert('Invalid username or password')
            }
        })

        reset()
    }

    return(
        <div className="login container">
            <div className="form">
                <h1 className="title">EVENTFUL</h1>
                <form>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your username"
                            {...register('username',{required:true})}
                        />
                        { errors.username && errors.username.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Username is required</span>) }
                        </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter your password"
                            {...register('password',{required:true})}
                            />
                        { errors.password && errors.password.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Password is required</span>) }
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Button className="button" as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>Sign Up</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
import React, {useState} from 'react'
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignUpPage=()=>{

    const {register, watch, handleSubmit, reset, formState:{ errors }} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [serverResponse,setServerResponse]=useState('');
    const [showTermsModal, setShowTermsModal] = useState(false);

    const submitForm=(data)=>{

    if (data.password === data.confirmPassword){

        const body={
            username:data.username,
            email:data.email,
            password:data.password
        }

        const requestOptions={
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(body)
        }
        fetch('/auth/signup',requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setServerResponse(data.message)
            console.log(serverResponse)

            setShowAlert(true)
        })
        .catch(err=>console.log(err))

        reset()
    }

    else{
        alert("Your Password Confirmation does not match your Password")
    }
    }

    console.log(watch("username"));
    console.log(watch("email"));
    console.log(watch("password"));
    console.log(watch("confirmPassword"));

    const openModal = () => {
        setShowTermsModal(true);
    }

    const closeModal = () => {
        setShowTermsModal(false);
    }

    return(
        <div className="signup container">
            <div className="form">
                <h1 className="title">EVENTFUL</h1>

                {showAlert && (
                    <>

                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <p className="success">
                            {serverResponse}
                        </p>
                    </Alert>
                    </>
                )}

                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your username"
                            {...register("username",{required:true,maxLength:25,minLength:5})}
                        />
                    { errors.username && errors.username.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Username is required</span>) }

                    { errors.username && errors.username.type === "maxLength" && (<span style={{color:"red",fontSize:"12px"}}>Maximum Username length is 25 characters</span>) }

                    { errors.username && errors.username.type === "minLength" && (<span style={{color:"red",fontSize:"12px"}}>Minimum Username length is 5 characters</span>) }

                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your email"
                            {...register("email",{required:true,maxLength:80})}
                        />
                    { errors.email && errors.email.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Email is required</span>) }

                    { errors.email && errors.email.type === "maxLength" && (<span style={{color:"red",fontSize:"12px"}}>Maximum Email length is 80 characters</span>) }
                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter your password"
                            {...register("password",{required:true,minLength:8})}
                        />
                    { errors.password && errors.password.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Password is required</span>) }

                    { errors.password && errors.password.type === "minLength" && (<span style={{color:"red",fontSize:"12px"}}>Minimum Password length is 8 characters</span>) }
                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Enter your password"
                            {...register("confirmPassword",{required:true,minLength:8})}
                        />
                    { errors.confirmPassword && errors.confirmPassword.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Password Confirmation is required</span>) }
                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <Button className="button" as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Sign Up</Button>
                    </Form.Group>


                    <br></br>
                    <Form.Group>
                        <p className="clickable-text" onClick={openModal}>Terms and Conditions</p>

                        <input id="terms" type="checkbox" {...register("acceptTerms", { required: true })} />
                        <small>I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</small>
                         <br></br>
                         { errors.acceptTerms && errors.acceptTerms.type === "required" && (<span style={{color:"red",fontSize:"12px"}}>Accepting the terms and conditions is required</span>) }

                    </Form.Group>

                    <br></br>
                    <Form.Group>
                        <small>Have an account? <Link to='/login'>Login</Link></small>
                    </Form.Group>

                    <Modal show={showTermsModal} onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title className="terms">Terms and Conditions</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="conditions">1. Acceptance of Terms</p>

                        <p className="conditionss">By accessing or using the API EVENTFUL, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the API.</p>

                        <p className="conditions">2. Use of the API</p>

                        <p className="conditionss">You agree to use the API for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the API.</p>

                        <p className="conditions">3. Data Usage and Privacy</p>

                        <p className="conditionss">We may collect and store certain information related to your usage of the API. Please refer to our Privacy Policy for details on how we handle your data.</p>

                        <p className="conditions">4. API Access</p>

                        <p className="conditionss">Access to the API may be limited, and we reserve the right to modify or terminate the API service at any time without notice.</p>

                        <p className="conditions">5. User Accounts</p>

                        <p className="conditionss">If the API requires user accounts, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.</p>

                        <p className="conditions">6. Changes to Terms</p>

                        <p className="conditionss">We reserve the right to change these Terms and Conditions at any time. Your continued use of the API after any such changes constitutes your acceptance of the new terms.</p>

                        <p className="conditions">7. Termination</p>

                        <p className="conditionss">We may terminate or suspend access to the API immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms and Conditions.</p>

                        <p className="conditions">8. Contact Information</p>

                        <p className="conditionss">For any questions about these Terms and Conditions, please contact us at out email: eventful.entertainment@gmail.com</p>
                      </Modal.Body>
                    </Modal>


                </form>
            </div>
        </div>
    )
}

export default SignUpPage
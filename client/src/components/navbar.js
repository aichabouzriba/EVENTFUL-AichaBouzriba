import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth, logout } from '../auth'

const LoggedInLinks = () => {
    return (
        <>
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/event" className="mx-2">Create Events</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About Us</Nav.Link>
            <Nav.Link as={Link} href="#" className="mx-2" onClick={()=>{logout()}} >Log Out</Nav.Link>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>

            <Nav.Link as={Link} to="/about" className="mx-2">About Us</Nav.Link>

            <NavDropdown title="Connect" id="navbarDropdownMenuLink" className="mx-2">
                <NavDropdown.Item as={Link} to="/signup">SignUp</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

const NavBar = () => {

    const [logged] = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
          <div className="container-fluid">

            <Navbar.Brand className="logo">EVENTFUL</Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarNavDropdown" />

            <Navbar.Collapse id="navbarNavDropdown">

              <Nav className="ms-auto">
                {logged?<LoggedInLinks/>:<LoggedOutLinks/>}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
    )
}

export default NavBar
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import EventPage from './components/event';
import AboutPage from './components/about';

const App=()=>{

    return (
        <Router>
            <div className = "">
                <NavBar/>
                <Routes>
                    <Route path="/event" element={<EventPage/>} />

                    <Route path="/login" element={<LoginPage/>} />

                    <Route path="/about" element={<AboutPage/>} />

                    <Route path="/signup" element={<SignUpPage/>} />

                    <Route path="/" element={<HomePage/>} />

                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'))


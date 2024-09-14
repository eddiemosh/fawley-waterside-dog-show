// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/header/header';
import Home from './home/home';
import Events from './components/events/events';
import TicketSelection from './components/tickets/ticket-selection';
import Payments from './components/payments/payments';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/fawley-waterside-dog-show/" element={<Home/>}/>
                <Route path="/fawley-waterside-dog-show/events" element={<Events/>}/>
                <Route path="/fawley-waterside-dog-show/tickets" element={<TicketSelection/>}/>
                <Route path="/fawley-waterside-dog-show/payments" element={<Payments/>}/>
            </Routes>
        </Router>
    );
}

export default App;

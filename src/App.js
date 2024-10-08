// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './home/home';
import Events from './components/events/events';
import TicketSelection from './components/tickets/ticket-selection';
import Payments from './components/payments/payments';
const basename = '/fawley-waterside-dog-show';
function App() {
    return (
        <Router basename={basename}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/tickets" element={<TicketSelection />} />
                <Route path="/payments" element={<Payments />} />
            </Routes>
        </Router>
    );
}

export default App;

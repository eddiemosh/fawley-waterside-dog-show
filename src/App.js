// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/header/header';
import Home from './home/home';
import Events from './components/events/events';
import TicketSelection from './components/tickets/ticket-selection';
import Payments from './components/payments/payments';
import OrderSuccess from "./components/order-complete/order-success";
import OrderFailure from "./components/order-complete/order-failure";
import Analytics from "./components/analytics/analytics";
import CashPayment from "./components/payments/cash-payment";
import Feedback from "./components/feedback/feedback";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/tickets" element={<TicketSelection/>}/>
                <Route path="/payments" element={<Payments/>}/>
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/order-failure" element={<OrderFailure />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/cash" element={<CashPayment />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<Home/>}/> {/* Redirect to Home for any unknown routes */}
            </Routes>
        </Router>
    );
}

export default App;

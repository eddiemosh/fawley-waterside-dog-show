// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/header/header';
import Home from './home/home';
import Events from './components/events/events';
import TicketSelection from './components/tickets/ticket-selection';
import Payments from './components/payments/payments';
import PaymentOptions from "./components/payments/payment-options/payment-options";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

// Load your Stripe public key here (Test or Live)
const stripePromise = loadStripe('pk_test_51RsBRuCYSxVmD9YE961zzGoiktGTR3mBTNE5uMUF5uKPbkh3yC7lmDJJjWfPlb8ijNdNEk32xSTe0dlNnvmQ3MYJ00huCxokEG')
function App() {
    return (
        <Elements stripe={stripePromise}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/tickets" element={<TicketSelection/>}/>
                    <Route path="/payments" element={<Payments/>}/>
                    <Route path="/payment-options" element={
                    <PaymentOptions/>
                    }/>
                </Routes>
            </Router>
        </Elements>
    );
}

export default App;

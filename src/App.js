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

const basename = '/fawley-waterside-dog-show';
// Load your Stripe public key here (Test or Live)
const stripePromise = loadStripe('pk_test_51PO5UrCxiZ7gi8V52FpcLKRVQdlPcAzkoe84sKorsQbhP8CSqhIyeVFeSbMmV8HvxbRryKdGIm5GHWhOONz3hmpk00wJSjYcm5');

function App() {
    return (
        <Router basename={basename}>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/tickets" element={<TicketSelection/>}/>
                <Route path="/payments" element={<Payments/>}/>
                <Route path="/payment-options" element={
                    <Elements stripe={stripePromise}>
                    <PaymentOptions/>
                    </Elements>
                }/>
            </Routes>
        </Router>
    );
}

export default App;

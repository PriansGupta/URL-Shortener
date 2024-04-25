import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Loader from "./loader"
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import auth from '../Auth/firebase';

function Plan(props) {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const updateCredits = async () => {
        setLoading(true);
        console.log("Startsssss")
        const res = await axios("https://make-it-easyy.vercel.app/order-successful", {
            email: user.email,
            creditsCredited: props.credits
        })
        setLoading(false);
        console.log(res.data);
    }
    const PaymentHandler = async (e) => {
        setLoading(true);
        const body = {
            amount: props.price,
            currency: "INR",
            receipt: "qwsaql"
        }

        const response = await axios.post("http://localhost:5000/order", body);
        setLoading(false);
        console.log(response.data.id);

        var options = {
            "key": "rzp_test_KHV6PzqYixh3G1", // Enter the Key ID generated from the Dashboard
            "amount": props.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                updateCredits();
            },
            "prefill": {
                "name": "ABCD",
                "email": "ABCD@gmail.comm",
                "contact": "8473672933"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }

    return (
        <Card style={{ width: '15rem' }}>
            <Loader open={isLoading}></Loader>
            <Card.Body>
                <Card.Title>₹{props.price / 100}/Month</Card.Title>
                <Card.Text>
                    Credits: {props.credits}
                </Card.Text>
                <Button variant="warning" onClick={PaymentHandler}>BUY</Button>
            </Card.Body>
        </Card>
    );
}

export default Plan;
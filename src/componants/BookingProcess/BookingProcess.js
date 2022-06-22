import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import { FormContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const BookingProcess = () => {
    const [response, setResponse] = useState({});
    const { userID, setUserID } = useContext(FormContext);
    const [userData, setUserData] = useState({});
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState({});
    const [destinations, setDestination] = useState([{
        id: 1,
        name: "start_address",
        type: "text",
        placeholder: "Pickup Location",
        errorMessage:
            "Please enter the address where you want to get pickedup from.",
        label: "Start address",
        required: true
    },
    {
        id: 2,
        name: "destination_01",
        type: "text",
        placeholder: "Destination 01 (Final Destination)",
        errorMessage:
            "Please enter the last address where you want to go.",
        label: "Destination 01 (Final Destination)",
        required: true

    }]);
    const [tripInformation, setTripInformation] = useState({
        id: 2,
        title: "Trip Information",
        inputs: [

            {
                id: 3,
                name: "flight_number",
                type: "text",
                placeholder: "Your Flight Number",
                errorMessage:
                    "Please enter your first name!",
                label: "Flight Number",
                pattern: "^[A-Za-z0-9]{3,16}$",
                required: true,
            }
        ]
    });

    useEffect(() =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/form/trip-information`)
            .then(res => res.json())
            .then(data => setTripInformation(data.forms[0]))
        , []);

    const [guestInformation, setGuestInformation] = useState({
        id: 2,
        title: "Trip Information",
        inputs: [

            {
                id: 3,
                name: "flight_number",
                type: "text",
                placeholder: "Your Flight Number",
                errorMessage:
                    "Please enter your first name!",
                label: "Flight Number",
                pattern: "^[A-Za-z0-9]{3,16}$",
                required: true,
            }
        ]
    });

    useEffect(() =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/form/guest-information`)
            .then(res => res.json())
            .then(data => setGuestInformation(data.forms[0]))
        , []);


    const forms = [
        {
            key: 0,
            section: [
                {
                    id: 1,
                    title: "Select Locations",
                    description: "Please select whare do you want to get picked up from",
                    inputs: destinations,
                    addInput: setDestination,
                    button_display: true
                },

                tripInformation

            ]

        },
        {
            key: 1,
            section: [
                guestInformation
            ]

        },

    ];

    const { values, setValues } = useContext(FormContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userID.length < 2) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, {
                first_name: values.first_name,
                last_name: values.last_name,
                address: values.address,
                city: values.city,
                postal_code: values.postal_code,
                country: values.country,
                phone: values.phone,
                email: values.email,
            })
                .then(res => {
                    setUserID(res.data.insertedId);
                });
        }

        console.log(values);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/bookings`, { ...values, userId: userID })
            .then(res => {
                console.log(res.data);
                setResponse(res.data);
                setValues({
                    start_address: "",
                    destination_01: "",
                    destination_02: "",
                    destination_03: "",
                    destination_04: "",
                    destination_05: "",
                    time_pickup: "",
                    date_pickup: "",
                    flight_number: "",
                    total_people: 1,
                    luggage_weight: "",
                    first_name: "",
                    last_name: "",
                    address: "",
                    city: "",
                    postal_code: "",
                    country: "",
                    phone: "",
                    email: "",
                });
            });

        setEmail(
            {
                from: "Mailgun Sandbox <postmaster@sandbox7655551c2ecd4f4e9579f5ad6a7a936e.mailgun.org>",
                to: ["sajidmahamud835@gmail.com"],
                subject: "Hello",
                text: "Testing some Mailgun awesomness!",
            }
        );

    };

    //email sender
    useEffect(() => {
        if (email.text) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/send-mail`, email)
                .then(res => {
                    console.log(res.data);
                });
        }
    }, [email]);

    useEffect(() => {
        if (response.acknowledged) {
            navigate(`/confirm/${response.insertedId}`, { replace: true });
        }
    }, [navigate, response.acknowledged, response.insertedId]);

    // Back Button
    const [btnBackStyle, setBtnBackStyle] = useState({ display: "none" });

    useEffect(() => {
        if (step === 0) {
            setBtnBackStyle({ display: "none" });
        } else {
            setBtnBackStyle({});
        }
    }, [step]);

    //Next or Submit Button
    const [btnNextStyle, setBtnNextStyle] = useState({ display: "none" });
    const [btnSubmitStyle, setBtnSubmitStyle] = useState({ display: "none" });
    useEffect(() => {
        if (step > 0) {
            setBtnNextStyle({ display: "none" });
            setBtnSubmitStyle({});
        } else {
            setBtnNextStyle({});
            setBtnSubmitStyle({ display: "none" });
        }
    }, [step]);

    const [display1, setDisplay1] = useState({ display: 'none' });
    const [display2, setDisplay2] = useState({ display: 'none' });

    //Step display or hide
    useEffect(() => {
        if (step === 0) {
            setDisplay1({});
            setDisplay2({ display: 'none' });
        }
        else if (step === 1) {
            setDisplay1({ display: 'none' });
            setDisplay2({});
        }
    }, [step]);

    return (
        <section id='booking_from' className='p-3'>
            <form onSubmit={handleSubmit} className="box px-5 py-3 m-2 shadow rounded">
                <h2 className='text-center text-dark mb-3'>Book Your Trip</h2>
                <div style={display1}>
                    <Step1
                        key={forms[step].key}
                        forms={forms}
                    />
                </div>
                <div style={display2}>
                    <Step2
                        key={forms[step].key}
                        forms={forms}
                        values={values}
                        setValues={setValues}
                        userData={userData}
                        setUserData={setUserData}
                    />
                </div>

                {/* <!-- Button trigger modal --> */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <button onClick={() => setStep(step - 1)} style={btnBackStyle} className='btn btn-outline-danger m-2 px-4'>Back</button>
                        <button onClick={() => setStep(step + 1)} style={btnNextStyle} className='btn btn-primary m-2 px-4'>Next</button>
                        <input style={btnSubmitStyle} className='btn btn-primary m-2 px-4' type="submit"></input>
                    </div>
                    <button type="button" style={btnBackStyle} className="btn btn-dark m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Already Have A User ID?
                    </button>
                </div>
            </form>


            <div className="card w-100 box px-5 py-3 m-2 mt-4 shadow border-0 rounded text-white bg-primary">
                <div className="card-body">
                    <h5 className="card-title">Need Help?</h5>
                    <p className="card-text">We are here to help you. Please call us at +41 78 676 63 69.</p>
                    <a href="tel:41786766369" className="btn btn-light"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg> Call Now</a>
                </div>
            </div>
        </section>
    );
};

export default BookingProcess;

// const inputNameGen = (name) => {
    //     num++;
    //     return {
    //         id: name.toLowerCase() + '_' + num,
    //         name: name + ' ' + num
    //     }
    // }
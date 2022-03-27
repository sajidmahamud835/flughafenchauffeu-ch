import React, { useState } from 'react';
import BookingForm from '../layouts/BookingForm/BookingForm';

const BookingProcess = () => {

    const [step, setStep] = useState(0)
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
        placeholder: "Destination 01",
        errorMessage:
            "Please enter the last address where you want to go.",
        label: "Destination 01",
        required: true

    }])


    const forms = [
        [
            {
                id: 1,
                title: "Select Locations",
                description: "Please select whare do you want to get picked up from",
                inputs: destinations,
                addInput: setDestination,
                values: {
                    start_address: "",
                    destination_01: "",
                    destination_02: "",
                    destination_03: "",
                    destination_04: "",
                    destination_05: "",
                },
                button_display: true
            },
            {
                id: 2,
                title: "Trip Information",
                inputs: [
                    {
                        id: 1,
                        name: "time_pickup",
                        type: "time",
                        placeholder: "Time We Pick You",
                        label: "Time We Pick You",
                    },
                    {
                        id: 2,
                        name: "date_pickup",
                        type: "date",
                        placeholder: "Date We Pick You",
                        label: "Date We Pick You",
                    },
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
                    },
                    {
                        id: 4,
                        name: "total_people",
                        type: "number",
                        placeholder: "Number of People",
                        errorMessage:
                            "Please enter the destination you want to go.",
                        label: "People",
                        required: true,
                    },
                    {
                        id: 5,
                        name: "luggage_weight",
                        type: "text",
                        placeholder: "Luggage Weight ",
                        errorMessage:
                            "Please enter the destination you want to go.",
                        label: "Luggage Weight",
                        required: true,
                    }
                ],
                values: {
                    time_pickup: "",
                    date_pickup: "",
                    flight_number: "",
                    total_people: "",
                    luggage_weight: "",
                }
            }
        ]
        ,
        [
            {
                id: 2,
                title: "Guest Information",
                inputs: [
                    {
                        id: 1,
                        name: "first_name",
                        type: "text",
                        placeholder: "Your First Name",
                        errorMessage:
                            "Please enter your first name!",
                        label: "First Name",
                        pattern: "^[A-Za-z0-9]{3,16}$",
                        required: true,
                    },
                    {
                        id: 2,
                        name: "last_name",
                        type: "text",
                        placeholder: "Your Last Name",
                        errorMessage:
                            "Please enter your last name!",
                        label: "Last Name",
                        pattern: "^[A-Za-z0-9]{3,16}$",
                        required: true,
                    },
                    {
                        id: 3,
                        name: "address",
                        type: "text",
                        placeholder: "Your Street Address",
                        errorMessage: "It should be address!",
                        label: "Street Address",

                    },
                    {
                        id: 3,
                        name: "city",
                        type: "text",
                        placeholder: "Your City",
                        errorMessage: "Please enter a valid postal code!",
                        label: "City",
                    },
                    {
                        id: 3,
                        name: "postal_code",
                        type: "text",
                        placeholder: "Postal code",
                        errorMessage: "Please enter a valid postal code!",
                        label: "Postal code",
                    },
                    {
                        id: 3,
                        name: "country",
                        type: "text",
                        placeholder: "Your Country",
                        errorMessage: "Please enter a valid postal code!",
                        label: "Country",
                    },
                    {
                        id: 4,
                        name: "phone",
                        type: "phone",
                        placeholder: "Your Phone Number",
                        label: "Phone Nubmer",
                        required: true,
                    },
                    {
                        id: 3,
                        name: "email",
                        type: "email",
                        placeholder: "Your Email Address",
                        errorMessage: "It should be a valid email address!",
                        label: "Email",
                        required: true,
                    }
                ],
                values: {
                    total_people: "",
                    input_2: "",
                    input_3: "",
                    input_4: "",
                    input_5: "",
                }
            }
        ]
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    let btnBackStyle
    if (step === 0) {
        btnBackStyle = {
            display: "none"
        }
    } else {
        btnBackStyle = {
        }
    }
    return (
        <section id='booking_from' className='p-3'>
            <form onSubmit={handleSubmit} className="box px-5 py-3 m-2 shadow-sm rounded">
                <h2 className='text-center text-dark mb-3'>Book Your Trip</h2>

                {
                    forms[step].map((form) => (
                        <BookingForm
                            key={form.id}
                            title={form.title}
                            inputs={form.inputs}
                            addInput={form.addInput}
                            values={form.values}
                            display={form.button_display}
                        />
                    ))
                }

                <button onClick={() => setStep(step - 1)} style={btnBackStyle} className='btn btn-outline-danger m-2 px-4'>Back</button>
                <button onClick={() => setStep(step + 1)} className='btn btn-primary m-2 px-4'>Next</button>
            </form>

            <div class="card w-100 box px-5 py-3 m-2 mt-4 shadow-sm border-0 rounded text-white bg-primary">
                <div class="card-body">
                    <h5 class="card-title">Need Help?</h5>
                    <p class="card-text">We are here to help you. Please call us at +41 78 676 63 69.</p>
                    <a href="tel:41786766369" class="btn btn-light"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
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
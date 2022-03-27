import React, { useState } from 'react';
import BookingForm from '../layouts/BookingForm/BookingForm';

const BookingProcess = () => {

    const [destinations, setDestination] = useState([{
        id: 1,
        name: "start_address",
        type: "text",
        placeholder: "Start address",
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


    const forms = [{
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
        title: "Guest Information",
        inputs: [
            {
                id: 1,
                name: "total_people",
                type: "number",
                placeholder: "Number of People",
                errorMessage:
                    "Please enter the destination you want to go.",
                label: "People",
                required: true,
            },
            {
                id: 1,
                name: "luggage_weight ",
                type: "text",
                placeholder: "Luggage Weight ",
                errorMessage:
                    "Please enter the destination you want to go.",
                label: "Luggage Weight",
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    console.log(forms[1].inputs)
    return (
        <section id='booking_from' className='p-3'>
            <form onSubmit={handleSubmit} className="box px-5 py-3 m-2 shadow-sm rounded">

                {
                    forms.map((form) => (
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

                <button className='btn btn-outline-danger m-2 px-4'>Back</button>
                <button className='btn btn-primary m-2 px-4'>Next</button>
            </form>
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
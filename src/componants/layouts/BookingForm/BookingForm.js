import React, { useState } from 'react';
import FormInput from './FormInput/FormInput';
import "./BookingForm.css"

const BookingForm = () => {
    const [values, setValues] = useState({
        input_1: "",
        input_2: "",
        input_3: "",
        input_4: "",
        input_5: "",
    });


    const inputs = [
        {
            id: 1,
            name: "input_1",
            type: "text",
            placeholder: "Input 1",
            errorMessage:
                "Please enter the destination you want to go.",
            label: "Input 1",
            required: true,
        },
        {
            id: 1,
            name: "input_2",
            type: "text",
            placeholder: "Input 1",
            errorMessage:
                "Please enter the destination you want to go.",
            label: "Input 1",
            required: true,
        },
        {
            id: 1,
            name: "input_3",
            type: "text",
            placeholder: "Input 1",
            errorMessage:
                "Please enter the destination you want to go.",
            label: "Input 1",
            required: true,
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className='booking-form'>
            <form onSubmit={handleSubmit} className="shadow px-5 py-3">
                <h2 className='text-center text-dark'>Pick Up Information</h2>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};

export default BookingForm;

/*
   
    /.***************input Example****************./
       const inputs = [
           {
               id: 1,
               name: "username",
               type: "text",
               placeholder: "Username",
               errorMessage:
                   "Username should be 3-16 characters and shouldn't include any special character!",
               label: "Username",
               pattern: "^[A-Za-z0-9]{3,16}$",
               required: true,
           },
           {
               id: 2,
               name: "email",
               type: "email",
               placeholder: "Email",
               errorMessage: "It should be a valid email address!",
               label: "Email",
               required: true,
           },
           {
               id: 3,
               name: "birthday",
               type: "date",
               placeholder: "Birthday",
               label: "Birthday",
           },
           {
               id: 4,
               name: "password",
               type: "password",
               placeholder: "Password",
               errorMessage:
                   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
               label: "Password",
               pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
               required: true,
           },
           {
               id: 5,
               name: "confirmPassword",
               type: "password",
               placeholder: "Confirm Password",
               errorMessage: "Passwords don't match!",
               label: "Confirm Password",
               pattern: values.password,
               required: true,
           },
       ];
   
   */
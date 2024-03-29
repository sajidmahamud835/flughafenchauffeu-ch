import React, { useContext, useEffect, useState } from 'react';
import FormInput from './FormInput/FormInput';
import "./BookingForm.css"
import AddOrRemoveBtn from './AddOrRemoveBtn/AddOrRemoveBtn';
import { FormContext } from '../../../App';

const BookingForm = (props) => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { values, setValues, suggestions, setSuggestions } = useContext(FormContext);
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const onAddressChange = (e, data, inputName) => {
        const dataField = inputName + "_data";
        setValues({ ...values, [inputName]: e.target.innerText, [dataField]: data });
        // setSuggestions({ ...suggestions, [inputName]: { items: [] } });
        delay(1000).then(() => setShowSuggestion(false));
        // e.target.parentNode.parentNode.className = 'd-none';
    }

    //add additonal destination filed
    const numOfDest = props.inputs.length;
    if (numOfDest === 6) {
        document.getElementById('add').style.display = 'none';
    }
    const newDestination = {
        id: numOfDest + 1,
        name: "destination_0" + numOfDest,
        type: "text",
        placeholder: "Ziel 0" + numOfDest,
        errorMessage:
            "Bitte geben Sie das gewünschte Ziel ein.",
        label: "Ziel 0" + numOfDest,
    }

    return (
        <div>
            <h5 className='text-center text-dark'>{props.title}</h5>
            <div className='mb-2 row'>
                <div className='col-10'>
                    {props.inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            location={suggestions['currentLocation']}
                            addressSuggestion={suggestions}
                            inputName={input.name}
                            onChange={onChange}
                            onAddressChange={onAddressChange}
                            showSuggestion={showSuggestion}
                            setShowSuggestion={setShowSuggestion}

                        />
                    ))}
                </div>
                <AddOrRemoveBtn
                    key={props.id}
                    addInput={props.addInput}
                    newDestination={newDestination}
                    inputs={props.inputs}
                    display={props.display}
                />
            </div>
        </div >
    );
};

export default BookingForm;

/* const [values, setValues] = useState({
    input_1: "",
    input_2: "",
    input_3: "",
    input_4: "",
    input_5: "",
}); */

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
               placeholder: "eMail",
               errorMessage: "Es sollte eine gültige E-Mail-Adresse sein!",
               label: "eMail",
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
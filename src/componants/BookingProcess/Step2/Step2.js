import React, { useContext, useEffect } from 'react';
import { FormContext } from '../../../App';
import BookingForm from '../../layouts/BookingForm/BookingForm';

const Step2 = (props) => {
    const { forms, values, setValues, userData, setUserData } = props;
    const { userID, setUserID } = useContext(FormContext);

    const handleApply = (e) => {
        e.preventDefault()
        setUserID(document.getElementById('userid0').value);
        fetch(`http://localhost:5000/users/${document.getElementById('userid0').value}`)
            .then(res => res.json())
            .then(data => setUserData(data.users[0]));
    }

    useEffect(() => {
        console.log(userData)
        setValues({
            ...values,
            first_name: userData.first_name,
            last_name: userData.last_name,
            address: userData.address,
            city: userData.city,
            postal_code: userData.postal_code,
            country: userData.country,
            phone: userData.phone,
            email: userData.email,
        })
    }, [userData])

    return (
        <div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Already Have A User ID?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Auto fill using your User ID.</p>
                            User ID: <input id="userid0" className='form-control' defultValue={userID} type="text" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => handleApply(e)} className="btn btn-primary">Auto Fill</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                forms[1].section.map((form) => (
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
        </div>
    );
};

export default Step2;
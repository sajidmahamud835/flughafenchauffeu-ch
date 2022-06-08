import React from 'react';
import BookingForm from '../../layouts/BookingForm/BookingForm';

const Step2 = (props) => {
    const { forms } = props;
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
                            User ID: <input className='form-control' type="text" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Auto Fill</button>
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
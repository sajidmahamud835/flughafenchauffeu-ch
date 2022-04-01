import React from 'react';
import BookingForm from '../../layouts/BookingForm/BookingForm';

const Step = (props) => {
    const { handleSubmit, forms, step, setStep, btnBackStyle } = props;
    return (

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

    );
};

export default Step;
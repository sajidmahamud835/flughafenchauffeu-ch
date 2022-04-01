import React from 'react';
import BookingForm from '../../layouts/BookingForm/BookingForm';

const Step = (props) => {
    const { forms, step } = props;
    return (
        <div>
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
        </div>
    );
};

export default Step;
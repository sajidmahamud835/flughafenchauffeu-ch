import React from 'react';
import BookingForm from '../../layouts/BookingForm/BookingForm';
const Step1 = (props) => {
    const { forms } = props;
    return (
        <div>
            {
                forms[0].section.map((form) => (
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

export default Step1;
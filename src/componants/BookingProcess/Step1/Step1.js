import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookingForm from '../../layouts/BookingForm/BookingForm';
const Step1 = (props) => {
    const { forms } = props;
    const [email, setEmail] = useState({})
    useEffect(() => {
        axios.post('http://localhost:5000/send-mail', email)
            .then(res => {
                console.log(res.data);
            })
    }, [email]);
    return (
        < div >
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
            <button onClick={() => setEmail(
                {
                    from: "Mailgun Sandbox <postmaster@sandbox7655551c2ecd4f4e9579f5ad6a7a936e.mailgun.org>",
                    to: ["sajidmahamud835@gmail.com"],
                    subject: "Hello",
                    text: "Testing some Mailgun awesomness!",
                }
            )}>Send Email</button>
        </div >
    );
};

export default Step1;
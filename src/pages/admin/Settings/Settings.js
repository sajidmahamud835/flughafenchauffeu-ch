import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseApp from '../../../firebase/FirebaseApp';
import AppSettings from './AppSettings/AppSettings';
import FormsAdd from './FormsAdd/FormsAdd';
import FormsOption from './FormsOption/FormsOption';


const Settings = () => {
    const auth = getAuth(FirebaseApp);
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            console.log('Page is loading')
        } else {
            if (!user) {
                toast("Please login!");
                navigate("/admin/login", { replace: true });
            } else {
                console.log('Logged in')
                console.log(user.email);
            }
        }
    });
    const [generalSettings, setGeneralSettings] = useState({});
    const [sectionOne, setSectionOne] = useState([
        {
            "_id": "62671d132c254186f07f737f",
            "id": 1,
            "title": "Guest Information",
            "inputs": [
                {
                    "id": 1,
                    "name": "first_name",
                    "type": "text",
                    "placeholder": "Your First Name",
                    "errorMessage": "Please enter your first name!",
                    "label": "First Name",
                    "pattern": "^[A-Za-z0-9]{3,16}$",
                    "required": true
                }
            ]
        }
    ])

    const [sectionTwo, setSectionTwo] = useState([
        {
            "_id": "62671d132c254186f07f737f",
            "id": 1,
            "title": "Guest Information",
            "inputs": [
                {
                    "id": 1,
                    "name": "first_name",
                    "type": "text",
                    "placeholder": "Your First Name",
                    "errorMessage": "Please enter your first name!",
                    "label": "First Name",
                    "pattern": "^[A-Za-z0-9]{3,16}$",
                    "required": true
                }
            ]
        }
    ])

    useEffect(() =>
        fetch('https://secret-river-49503.herokuapp.com/general-settings')
            .then(res => res.json())
            .then(data => setGeneralSettings(data.settings[0]))
        , []);

    const saveSettings = (e) => {
        e.preventDefault()
        delete generalSettings["_id"];
        const url = `https://secret-river-49503.herokuapp.com/general-settings`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(generalSettings)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    useEffect(() =>
        fetch('https://secret-river-49503.herokuapp.com/form/trip-information')
            .then(res => res.json())
            .then(data => setSectionOne(data.forms))
        , [])

    useEffect(() =>
        fetch('https://secret-river-49503.herokuapp.com/form/guest-information')
            .then(res => res.json())
            .then(data => setSectionTwo(data.forms))
        , [])

    return (
        <section className='row'>
            <div className="col-10 container shadow-sm p-5 my-3">
                <h3 className="text-center m-2 p-4">General Settings</h3>
                <form className="row g-3">
                    <h4>MAP API & Calculator Settings</h4>

                    <AppSettings
                        saveSettings={saveSettings}
                        generalSetting={generalSettings}
                        setGeneralSettings={setGeneralSettings}
                    />

                    <h4>Form Settings</h4>
                    <FormsAdd />
                    <h5 className="text-center">Trip Information</h5>
                    {
                        sectionOne[0].inputs.map((input) => (<FormsOption key={input.id} input={input} />))
                    }
                    <h5 className="text-center">Personal Information</h5>
                    {
                        sectionTwo[0].inputs.map((input) => (<FormsOption key={input.id} input={input} />))
                    }
                </form>

            </div>
        </section>
    );
};

export default Settings;
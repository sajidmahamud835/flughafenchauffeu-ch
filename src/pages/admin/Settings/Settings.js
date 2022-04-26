import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseApp from '../../../firebase/FirebaseApp';


const Settings = () => {
    const auth = getAuth(FirebaseApp);
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();

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

    const [sectionOne, setSectionOne] = useState([])

    useEffect(() =>
        fetch('http://localhost:5000/form/guest-information')
            .then(res => res.json())
            .then(data => setSectionOne(data.forms))
        , [])
    return (
        <div className='container'>
            <h1 className='text-center my-2'>Settings</h1>
            <div className="container shadow">
                <h3 className="text-center m-2 p-4">Trip Information Section</h3>


            </div>
        </div>
    );
};

export default Settings;
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseApp from '../../../firebase/FirebaseApp';
import AllBookings from '../AllBookings/AllBookings';

const Admin = () => {
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

    return (
        <div className='p-5'>
            <AllBookings />
        </div>
    );
};

export default Admin;
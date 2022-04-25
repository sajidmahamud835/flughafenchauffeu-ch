import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './AllBookings.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingsList from '../../../componants/BookingsList/BookingsList';
import FirebaseApp from '../../../firebase/FirebaseApp';



const AllBookings = () => {
    const auth = getAuth(FirebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [dataChange, setDataChange] = useState([])
    let navigate = useNavigate();



    useEffect(() => {
        if (loading) {
            console.log('Page is loading.....')
        } else {
            if (!user) {
                toast("Please login!");
                navigate("/admin/login", { replace: true });
            } else {
                console.log('Logged in')
                console.log(user.email);
            }
        }
    }, [loading, user, navigate]);

    const handleDelete = id => {
        const url = `http://localhost:5000/bookings/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataChange(data);
            })

    }

    const handleStatus = (id, status) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm("Are you sure to change the booking status to: " + status + "?");
        if (confirmed === true) {
            const url = `http://localhost:5000/bookings/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    status: { status }
                }
                )
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setDataChange(data);
                })
        }

    }

    const [bookings, setBookings] = useState([])

    useEffect(() =>
        fetch('http://localhost:5000/bookings')
            .then(res => res.json())
            .then(data => setBookings(data.bookings))
        , [dataChange])

    return (
        <div id='all-bookings'>
            <div class="container">
                <h3 className="text-center">All Bookings</h3>
                <table class=" table  table-bordered table-sm" cellspacing="0"
                    width="100%">
                    <thead>
                        <tr>
                            <th scope="col">Client Name</th>
                            <th scope="col">Start Address</th>
                            <th scope="col">Dest 01</th>
                            <th scope="col">Dest 02</th>
                            <th scope="col">Dest 03</th>
                            <th scope="col">Dest 04</th>
                            <th scope="col">Dest 05</th>
                            <th scope="col">Pickup Time</th>
                            <th scope="col">Pickup Date</th>
                            <th scope="col">Flight Number</th>
                            <th scope="col">Total People</th>
                            <th scope="col">Luggage Weight</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Booking ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking => <BookingsList key={booking._id} booking={booking} handleDelete={handleDelete} handleStatus={handleStatus}>

                            </BookingsList>))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBookings;
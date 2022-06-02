import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseApp from '../../../firebase/FirebaseApp';



const SingleBooking = () => {
    const { id } = useParams();
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
        const url = `https://secret-river-49503.herokuapp.com/bookings/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataChange(data);
            })
        window.location.href = '/admin/booking/';
    }

    const handleStatus = (id, status) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm("Are you sure to change the booking status to: " + status + "?");
        if (confirmed === true) {
            const url = `https://secret-river-49503.herokuapp.com/bookings/${id}`;
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
        fetch('https://secret-river-49503.herokuapp.com/bookings')
            .then(res => res.json())
            .then(data => setBookings(data.bookings))
        , [dataChange])

    return (
        <div id='all-bookings'>
            <div className="my-2">
                {
                    bookings.map((booking => {
                        if (booking._id === id) {

                            return (
                                <div className='container shadow p-5 w-75'>
                                    <div>
                                        <div className='d-flex justify-content-between mb-5'> <h2>View Booking</h2> <Link to="/admin/bookings/" type="button" className="btn btn-primary"><i className="fas fa-list"></i> Go Back To List</Link></div>
                                        <h3 className='mb-2'>Booking Details</h3>
                                        <h5><strong>Start Address:</strong> {booking.start_address}</h5>
                                        <h5><strong>Final Destination:</strong> {booking.destination_01}</h5>
                                        {booking.destination_02 && <h5><strong>Stop 01:</strong> {booking.destination_02}</h5>}
                                        {booking.destination_03 && <h5><strong>Stop 02:</strong> {booking.destination_03}</h5>}
                                        {booking.destination_04 && <h5><strong>Stop 03:</strong> {booking.destination_04}</h5>}
                                        {booking.destination_05 && <h5><strong>Stop 04:</strong> {booking.destination_05}</h5>}
                                        <h5><strong>Pickup Time & Date:</strong> {booking.time_pickup}, {booking.date_pickup}</h5>
                                        <h5><strong>Flight Number:</strong> {booking.flight_number}</h5>
                                        <h5><strong>Total People: {booking.total_people}</strong></h5>
                                        <h5><strong>Luggage Weight:</strong> {booking.luggage_weight}</h5>
                                        <h3 className='mt-4'>Client Details</h3>
                                        <h5><strong>Client Name:</strong> {booking.first_name} {booking.last_name}</h5>
                                        <h5><strong>Email: </strong> {booking.email}</h5>
                                        <h5><strong>Phone:</strong> {booking.phone}</h5>
                                        <h5><strong>Address:</strong> {booking.address}</h5>
                                        <h5><strong>City:</strong> {booking.city}</h5>
                                        <h5><strong>Postal Code:</strong> {booking.postal_code}</h5>
                                        <h5><strong>Country:</strong> {booking.country}</h5>
                                        <h5><strong>Booking ID:</strong> {booking._id}</h5>
                                        <div className='d-flex justify-content-between mt-5'> <h5><strong>Status:</strong> <select value={booking.status} onChange={(e) => handleStatus(booking._id, e.target.value)} name="status" id="status">
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Canceled">Canceled</option>
                                        </select></h5> <button onClick={() => handleDelete(booking._id)} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i> Delete</button></div>
                                    </div>
                                </div>
                            );
                        } else {
                            return <div></div>
                        }
                    }
                    ))
                }
            </div>
        </div>
    );
};

/* <tr id='booking-list'>
    <th title='Client Name' scope="row">{first_name} {last_name}</th>
    <td title='Start Address'></td>
    <td title='Final Destination'>{destination_01}</td>
    <td title='Stop 01'>{destination_02}</td>
    <td title='Stop 02'>{destination_03}</td>
    <td title='Stop 03'>{destination_04}</td>
    <td title='Stop 04'>{destination_05}</td>
    <td title='Pickup Time & Date<'>{time_pickup}, {date_pickup}</td>
    <td>{flight_number}</td>
    <td>{total_people}</td>
    <td>{luggage_weight}</td>
    <td> <button onClick={showEmail} className="btn btn-primary"><i className="far fa-envelope"></i></button> </td>
    <td><button onClick={showPhone} className="btn btn-success"><i className="fas fa-phone"></i></button></td>
    <td>{_id}</td>
    <td><select value={status} onChange={(e) => props.handleStatus(props.booking._id, e.target.value)} name="status" id="status">
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        <option value="Canceled">Canceled</option>
    </select></td>
    <td>
        <Link to={`/admin/booking/${props.booking._id}`} type="button" className="btn btn-dark"><i className="fa fa-eye"></i> View</Link>
        <button onClick={() => props.handleDelete(props.booking._id)} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
    </td>
</tr>  */

export default SingleBooking;
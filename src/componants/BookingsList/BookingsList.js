import React from 'react';
import './BookingsList.css';

const BookingsList = (props) => {
    const { start_address, destination_01, destination_02, destination_03, destination_04, destination_05, time_pickup, date_pickup, flight_number, total_people, luggage_weight, first_name, last_name, address, city, postal_code, country, phone, email, _id, status } = props.booking || {}

    const showEmail = () => alert('Email Address: ' + email);
    const showPhone = () => alert('Phone Number: ' + phone);

    return (

        <tr id='booking-list'>
            <th scope="row">{first_name} {last_name}</th>
            <td>{start_address}</td>
            <td>{destination_01}</td>
            <td>{destination_02}</td>
            <td>{destination_03}</td>
            <td>{destination_04}</td>
            <td>{destination_05}</td>
            <td>{time_pickup}</td>
            <td>{date_pickup}</td>
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
                <button onClick={() => props.handleDelete(props.booking._id)} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
            </td>
        </tr>

    );
};

export default BookingsList;
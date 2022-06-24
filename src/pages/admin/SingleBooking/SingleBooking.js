import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseApp from '../../../firebase/FirebaseApp';
import { DisplayMapFC } from '../../../DisplayMapFC';



const SingleBooking = () => {
    const { id } = useParams();
    const auth = getAuth(FirebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [dataChange, setDataChange] = useState([]);
    const [distance, setDistance] = useState(0);
    const [apiKey, setApiKey] = useState('pEkb6dHSrZx_gcFA7JcJbWvZRcs71rxjU3lvj3AChY4');
    let navigate = useNavigate();



    useEffect(() => {
        if (loading) {
            console.log('Page is loading.....');
        } else {
            if (!user) {
                toast("Please login!");
                navigate("/admin/login", { replace: true });
            } else {
                console.log('Logged in');
                console.log(user.email);
            }
        }
    }, [loading, user, navigate]);

    const handleDelete = id => {
        const url = `${process.env.REACT_APP_SERVER_URL}/bookings/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataChange(data);
                window.location.href = '/admin/bookings/';
            });

    };

    const handleStatus = (id, status) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm("Are you sure to change the booking status to: " + status + "?");
        if (confirmed === true) {
            const url = `${process.env.REACT_APP_SERVER_URL}/bookings/${id}`;
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
                });
        }

    };

    const [bookings, setBookings] = useState([]);

    useEffect(() =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/bookings`)
            .then(res => res.json())
            .then(data => setBookings(data.bookings))
        , [dataChange]);

    const startAddressSvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">S</text></svg>';

    const destination01SvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">FD</text></svg>';

    const destination02SvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">S1</text></svg>';

    const destination03SvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">S2</text></svg>';

    const destination04SvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">S3</text></svg>';


    const destination05SvgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">S4</text></svg>';

    return (
        <div id='all-bookings'>
            <div className="my-2">
                {
                    bookings.map((booking => {
                        if (booking._id === id) {
                            return (
                                <div className='container shadow p-5 w-75 my-5'>
                                    <div className='d-flex justify-content-between mb-5'>
                                        <h2>View Booking</h2>
                                        <Link to="/admin/bookings/" type="button" className="btn btn-primary">
                                            <i className="fas fa-list"></i> Go Back To List</Link>
                                    </div>
                                    <div className='row'>
                                        <div className='col-5 container shadow-sm p-5'>
                                            <h3 className='mb-2'>Booking Details</h3>
                                            <h5><strong>Startadresse:</strong> {booking.start_address}</h5>
                                            <h5><strong>Endstation:</strong> {booking.destination_01}</h5>
                                            {booking.destination_02 && <h5><strong>Stop 01:</strong> {booking.destination_02}</h5>}
                                            {booking.destination_03 && <h5><strong>Stop 02:</strong> {booking.destination_03}</h5>}
                                            {booking.destination_04 && <h5><strong>Stop 03:</strong> {booking.destination_04}</h5>}
                                            {booking.destination_05 && <h5><strong>Stop 04:</strong> {booking.destination_05}</h5>}
                                            <h5><strong>Abholzeit und -datum:</strong> {booking.time_pickup}, {booking.date_pickup}</h5>
                                            <h5><strong>Flight Number:</strong> {booking.flight_number}</h5>
                                            <h5><strong>Total People: {booking.total_people}</strong></h5>
                                            <h5><strong>Luggage Weight:</strong> {booking.luggage_weight}</h5>
                                            <h3 className='mt-4'>Client Details</h3>
                                            <h5><strong>Kundenname:</strong> {booking.first_name} {booking.last_name}</h5>
                                            <h5><strong>eMail: </strong> {booking.email}</h5>
                                            <h5><strong>Telefon:</strong> {booking.phone}</h5>
                                            <h5><strong>Address:</strong> {booking.address}</h5>
                                            <h5><strong>Stadt:</strong> {booking.city}</h5>
                                            <h5><strong>Postal Code:</strong> {booking.postal_code}</h5>
                                            <h5><strong>Country:</strong> {booking.country}</h5>
                                            <h5><strong>Buchungs-ID:</strong> {booking._id}</h5>
                                        </div>


                                        <section id='cost_calculator' className='col-6 container shadow-sm p-5'>

                                            <h3 className='text-center text-dark'>geschätzte Entfernung & Kosten</h3>
                                            <div className='m-3'>

                                                {(apiKey && booking.start_address_data && !booking.destination_01_data && !booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords: {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                }
                                                                , {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: 40.53075,
                                                                        lng: 10.3851
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    />
                                                </div>}

                                                {(apiKey && booking.start_address_data && booking.destination_01_data && !booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_01_data.position.lat,
                                                                        lng: booking.destination_01_data.position.lng
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        setDistance={setDistance}
                                                        distance={distance}
                                                    />
                                                </div>}

                                                {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_01_data.position.lat,
                                                                        lng: booking.destination_01_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination02SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_02_data.position.lat,
                                                                        lng: booking.destination_02_data.position.lng
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        setDistance={setDistance}
                                                        distance={distance}
                                                    />
                                                </div>}



                                                {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_01_data.position.lat,
                                                                        lng: booking.destination_01_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination02SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_02_data.position.lat,
                                                                        lng: booking.destination_02_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination03SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_03_data.position.lat,
                                                                        lng: booking.destination_03_data.position.lng
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        setDistance={setDistance}
                                                        distance={distance}
                                                    />
                                                </div>}



                                                {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_01_data.position.lat,
                                                                        lng: booking.destination_01_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination02SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_02_data.position.lat,
                                                                        lng: booking.destination_02_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination03SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_03_data.position.lat,
                                                                        lng: booking.destination_03_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination04SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_04_data.position.lat,
                                                                        lng: booking.destination_04_data.position.lng
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        setDistance={setDistance}
                                                        distance={distance}
                                                    />
                                                </div>}


                                                {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && booking.destination_04_data && booking.destination_05_data) && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: booking.start_address_data.position.lat, lng: booking.start_address_data.position.lng }}
                                                        zoom={14}
                                                        width="100%"
                                                        height="350"
                                                        addressMarkers={
                                                            [
                                                                {
                                                                    svgMarkup: startAddressSvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.start_address_data.position.lat,
                                                                        lng: booking.start_address_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination01SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_01_data.position.lat,
                                                                        lng: booking.destination_01_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination02SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_02_data.position.lat,
                                                                        lng: booking.destination_02_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination03SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_03_data.position.lat,
                                                                        lng: booking.destination_03_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination04SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_04_data.position.lat,
                                                                        lng: booking.destination_04_data.position.lng
                                                                    }
                                                                },
                                                                {
                                                                    svgMarkup: destination05SvgMarkup,
                                                                    coords:
                                                                    {
                                                                        lat: booking.destination_05_data.position.lat,
                                                                        lng: booking.destination_05_data.position.lng
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        setDistance={setDistance}
                                                        distance={distance}
                                                    />
                                                </div>}



                                                {!apiKey && <section className='map card rounded shadow mb-3 d-flex'> <div className='text-center mt-5 pt-5 px-2'><h4 className='mt-5'>Please set  here.com api on settings page to use this function.</h4></div> </section>}

                                                {!booking.start_address_data && <div className='rounded shadow mb-3'>
                                                    <DisplayMapFC
                                                        apikey={apiKey}
                                                        center={{ lat: 50, lng: 5 }}
                                                        zoom={4}
                                                        width="100%"
                                                        height="350"
                                                    />
                                                </div>}
                                                <br />
                                                {booking.start_address_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Start:</strong> <span title={`lat: ${booking.start_address_data.position.lat}, lng: ${booking.start_address_data.position.lng}`} >{booking.start_address_data.title}</span>  </small>
                                                }
                                                {booking.destination_02_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Stop 01:</strong> <span title={`lat: ${booking.destination_02_data.position.lat}, lng: ${booking.destination_02_data.position.lng}`} >{booking.destination_02_data.title}</span>  </small>
                                                }
                                                {booking.destination_03_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Stop 02:</strong> <span title={`lat: ${booking.destination_03_data.position.lat}, lng: ${booking.destination_03_data.position.lng}`} >{booking.destination_03_data.title}</span>  </small>
                                                }
                                                {booking.destination_04_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Stop 03:</strong> <span title={`lat: ${booking.destination_04_data.position.lat}, lng: ${booking.destination_04_data.position.lng}`} >{booking.destination_04_data.title}</span>  </small>
                                                }
                                                {booking.destination_05_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Stop 04:</strong> <span title={`lat: ${booking.destination_05_data.position.lat}, lng: ${booking.destination_05_data.position.lng}`} >{booking.destination_05_data.title}</span>  </small>
                                                }
                                                {booking.destination_01_data &&
                                                    <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                                                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                                                    </svg>
                                                        <strong> Final Destinaton:</strong> <span title={`lat: ${booking.destination_01_data.position.lat}, lng: ${booking.destination_01_data.position.lng}`} >{booking.destination_01_data.title}</span>  </small>
                                                }
                                                <hr />

                                                <h6 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                                                    <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                                                </svg> <strong>Gesamtentfernung:</strong> {distance} km</h6>
                                                <h6 className='d-block'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                    <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                </svg> <strong>Passagiere:</strong> {booking.total_people}</h6>

                                                <hr />
                                                <h5 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                                                </svg> <strong>Gesamtkosten:</strong> {Math.round(distance * 1.62)} CHF</h5>
                                            </div>
                                        </section>
                                    </div>
                                    <div className='d-flex justify-content-between mt-5'> <h5><strong>Status:</strong> <select value={booking.status} onChange={(e) => handleStatus(booking._id, e.target.value)} name="status" id="status">
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Canceled">Canceled</option>
                                    </select></h5> <button onClick={() => handleDelete(booking._id)} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i> Delete</button></div>
                                </div>
                            );
                        } else {
                            return <div></div>;
                        }
                    }
                    ))
                }
            </div>
        </div>
    );
};

/* <tr id='booking-list'>
    <th title='Kundenname' scope="row">{first_name} {last_name}</th>
    <td title='Startadresse'></td>
    <td title='Endstation'>{destination_01}</td>
    <td title='Stop 01'>{destination_02}</td>
    <td title='Stop 02'>{destination_03}</td>
    <td title='Stop 03'>{destination_04}</td>
    <td title='Stop 04'>{destination_05}</td>
    <td title='Abholzeit und -datum<'>{time_pickup}, {date_pickup}</td>
    <td>{flight_number}</td>
    <td>{total_people}</td>
    <td>{luggage_weight}</td>
    <td> <button onClick={showeMail} className="btn btn-primary"><i className="far fa-envelope"></i></button> </td>
    <td><button onClick={showTelefon} className="btn btn-success"><i className="fas fa-phone"></i></button></td>
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
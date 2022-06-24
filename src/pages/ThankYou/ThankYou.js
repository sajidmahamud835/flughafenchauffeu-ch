import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../App';
import { DisplayMapFC } from '../../DisplayMapFC';



const ThankYou = () => {
    const { id } = useParams();
    const [dataChange, setDataChange] = useState([]);
    const [distance, setDistance] = useState(0);
    const [apiKey, setApiKey] = useState('pEkb6dHSrZx_gcFA7JcJbWvZRcs71rxjU3lvj3AChY4');
    const { userID } = useContext(FormContext);
    let navigate = useNavigate();

    //hendel delete option
    const handleDelete = id => {
        const url = `${process.env.REACT_APP_SERVER_URL}/bookings/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDataChange(data);
            })
            .then(() => window.location.href = '/');

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
            <div className='container'>
                <div className='row bg-info text-light shadow p-3 mx-2 my-1 rounded'>
                    <div className='col-2'>
                        <img className='img-fluid' src="/img/success.jpg" alt="" />
                    </div>
                    <div className='col'>
                        <h3>Booking Success!</h3>
                        <p>Thank you so much. The booking was succesful. Please wait, one of our member will reach you out soon.</p>
                        <h6>Save your User ID (<strong className='text-warning'>{userID}</strong>) for future, for auto fillng the data. We also sent you a copy in your email.</h6>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                {
                    bookings.map((booking => {
                        if (booking._id === id) {
                            return (
                                <div className='container shadow p-5 my-1 rouonded'>
                                    <div className='d-flex justify-content-between mb-5'>
                                        <h3>Booking Summery</h3>
                                        <Link to="/" type="button" className="btn btn-primary">
                                            <i className="fas fa-plus"></i> Create Another Bookings</Link>
                                    </div>
                                    <div className='bg-light p-1 shadow-sm rounded m-3'>
                                        {(apiKey && booking.start_address_data && !booking.destination_01_data && !booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow-sm'>
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

                                        {(apiKey && booking.start_address_data && booking.destination_01_data && !booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow-sm'>
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

                                        {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && !booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow-sm'>
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



                                        {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && !booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow-sm'>
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



                                        {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && booking.destination_04_data && !booking.destination_05_data) && <div className='rounded shadow-sm'>
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


                                        {(apiKey && booking.start_address_data && booking.destination_01_data && booking.destination_02_data && booking.destination_03_data && booking.destination_04_data && booking.destination_05_data) && <div className='rounded shadow-sm'>
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



                                        {!apiKey && <section className='map card rounded shadow-sm d-flex'> <div className='text-center mt-5 pt-5 px-2'><h4 className='mt-5'>Please set  here.com api on settings page to use this function.</h4></div> </section>}

                                        {!booking.start_address_data && <div className='rounded shadow-sm'>
                                            <DisplayMapFC
                                                apikey={apiKey}
                                                center={{ lat: 50, lng: 5 }}
                                                zoom={4}
                                                width="100%"
                                                height="350"
                                            />
                                        </div>}

                                    </div>
                                    <div className='row'>
                                        <div className='col-5 container bg-light shadow-sm p-5'>
                                            <h3 className='mb-3'>Client Details</h3>
                                            <h6><strong>User ID:</strong> <span className='bg-white shadow-sm p-1'>{userID}</span></h6>
                                            <h6><strong>Kundenname:</strong> {booking.first_name} {booking.last_name}</h6>
                                            <h6><strong>eMail: </strong> {booking.email}</h6>
                                            <h6><strong>Telefon:</strong> {booking.phone}</h6>
                                            <h6><strong>Address:</strong> {booking.address}</h6>
                                            <h6><strong>Stadt:</strong> {booking.city}</h6>
                                            <h6><strong>Postal Code:</strong> {booking.postal_code}</h6>
                                            <h6><strong>Country:</strong> {booking.country}</h6>
                                            <hr />
                                            <h6><strong>Status:</strong> <select className='p-1 rounded' value={booking.status} onChange={(e) => handleStatus(booking._id, e.target.value)} name="status" id="status" disabled>
                                                <option value="Pending">Pending</option>
                                            </select></h6>
                                        </div>


                                        <section id='cost_calculator' className='col-5 container bg-light shadow-sm p-5'>
                                            <h3 className='mb-3'>Booking Details</h3>
                                            <h6><strong>Buchungs-ID:</strong> {booking._id}</h6>
                                            <hr />
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
                                            <h6><strong>Abholzeit und -datum:</strong> {booking.time_pickup}, {booking.date_pickup}</h6>
                                            {booking.flight_number && <h6><strong>Flight Number:</strong> {booking.flight_number}</h6>}
                                            {booking.luggage_weight && <h6><strong>Luggage Weight:</strong> {booking.luggage_weight}</h6>}
                                            <hr />
                                            <h6 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h3.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                                                <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                                            </svg> <strong>Gesamtentfernung:</strong> {booking.distance && <span>{booking.distance} km</span>} {!booking.distance && <span>not claculated</span>}</h6>
                                            <h6 className='d-block'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            </svg> <strong>Passagiere:</strong> {booking.total_people}</h6>

                                            <hr />
                                            <h6 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                                                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                                            </svg> <strong>Estimated Total Cost:</strong> {booking.totalCost && <span>{booking.totalCost} CHF</span>} {!booking.totalCost && <span>not claculated</span>}</h6>
                                        </section>
                                    </div>
                                    <div className='d-flex justify-content-between mt-5'>  <button onClick={() => handleDelete(booking._id)} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i> Cancel & Delete</button> <Link to="/" type="button" className="btn btn-primary">
                                        <i className="fas fa-done"></i>Confirm Booking</Link></div>
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

export default ThankYou;
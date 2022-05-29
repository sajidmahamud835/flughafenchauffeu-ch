import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../App';
const BookingCostCalculator = () => {
    const [apiKey, setApiKey] = useState('pEkb6dHSrZx_gcFA7JcJbWvZRcs71rxjU3lvj3AChY4');
    const { values, suggestions, setSuggestions } = useContext(FormContext);
    const defaultData = { "items": [{ "title": "New York, NY, United States", "id": "here:cm:namedplace:21019301", "resultType": "locality", "localityType": "city", "address": { "label": "New York, NY, United States", "countryCode": "USA", "countryName": "United States", "stateCode": "NY", "state": "New York", "county": "New York", "city": "New York", "postalCode": "10007" }, "position": { "lat": 40.71455, "lng": -74.00714 }, "mapView": { "west": -74.2589, "south": 40.47742, "east": -73.70038, "north": 40.91762 }, "scoring": { "queryScore": 1.0, "fieldScore": { "city": 1.0 } } }, { "title": "NY, United States", "id": "here:cm:namedplace:21010819", "resultType": "administrativeArea", "administrativeAreaType": "state", "address": { "label": "NY, United States", "countryCode": "USA", "countryName": "United States", "stateCode": "NY", "state": "New York" }, "position": { "lat": 42.65155, "lng": -73.75521 }, "mapView": { "west": -79.76212, "south": 40.47742, "east": -71.66864, "north": 45.01608 }, "scoring": { "queryScore": 1.0, "fieldScore": { "state": 1.0 } } }] };

    const suggestionsGenerator = (fieldName, value) => {
        if (value === undefined || value.length <= 0) {
            console.log("Start Address is empty.");
            setSuggestions({ ...suggestions, [fieldName]: defaultData })
        }
        else {
            console.log(value);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${value}&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setSuggestions({ ...suggestions, [fieldName]: data }));
        }
    }

    useEffect(() => {
        suggestionsGenerator('start_address', values.start_address)
    }, [values.start_address]);


    return (
        <section id='cost_calculator' className='p-3'>
            <div className="box shadow-sm p-2">
                <h3 className='text-center text-dark'>Estimated Distance & Cost</h3>
                <div className='m-3'>

                    {(apiKey && values.start_address_data) && <iframe title="map" className='rounded shadow mb-3' width="100%" height="320px" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={`https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${apiKey}&c=${values.start_address_data.position.lat},${values.start_address_data.position.lng}&z=15&w=500`}></iframe>}

                    {!apiKey && <section className='map card rounded shadow mb-3 d-flex'> <div className='text-center mt-5 pt-5 px-2'><h4 className='mt-5'>Please set  here.com api on settings page to use this function.</h4></div> </section>}

                    {!values.start_address_data && <section className='card'> <div className='text-center mt-5 pt-5 position-absolute px-2'><h4 className='mt-5'>Strat typing the address to see the location real time.</h4></div>
                        <iframe title="map" className='rounded shadow' width="100%" height="320px" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={`https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${apiKey}&c=40.71455,-74.00714&z=14&w=500`}></iframe> </section>}
                    <br />
                    {values.start_address_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Start:</strong> <span title={`lat: ${values.start_address_data.position.lat}, lng: ${values.start_address_data.position.lng}`} >{values.start_address}</span>  </small>
                    }
                    <hr />

                    <h6 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                        <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                    </svg> <strong>Total Distance:</strong> 0.00 CHF</h6>
                    <h6 className='d-block'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    </svg> <strong>Pessenger:</strong> {values.total_people}</h6>

                    <hr />
                    <h5 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                    </svg> <strong>Total Cost:</strong> 0.00 CHF</h5>

                    <div className='ms-auto'>
                        <button className='btn btn-outline-danger me-2 mt-3'>Reset</button>
                        <button className='btn btn-outline-dark mt-3'>Find me on map</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingCostCalculator;
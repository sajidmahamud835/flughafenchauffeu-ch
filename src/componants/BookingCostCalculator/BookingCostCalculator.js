import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../App';
import { DisplayMapFC } from '../../DisplayMapFC';
const BookingCostCalculator = () => {
    const [apiKey, setApiKey] = useState('pEkb6dHSrZx_gcFA7JcJbWvZRcs71rxjU3lvj3AChY4');
    const { values, setValues, suggestions, setSuggestions } = useContext(FormContext);

    const defaultData = { "items": [] };
    const [startAddressSuggestion, setStartAddressSuggestion] = useState(defaultData);
    const [destination01Suggestion, setDestination01Suggestion] = useState(defaultData);
    const [destination02Suggestion, setDestination02Suggestion] = useState(defaultData);
    const [destination03Suggestion, setDestination03Suggestion] = useState(defaultData);
    const [destination04Suggestion, setDestination04Suggestion] = useState(defaultData);
    const [destination05Suggestion, setDestination05Suggestion] = useState(defaultData);
    const [currentLocation, setCurrentLocation] = useState({ isLocationOn: false });
    const [hqAddress, setHQAddress] = useState({});
    const [hqAddressData, setHQAddressData] = useState({});

    const [distance, setDistance] = useState(0);
    const [defautlCords, setDefautlCords] = useState({ lat: 50, lng: 5 });
    // const [hqSummery, setHQSummery] = useState;

    useEffect(() => {
        setSuggestions({ ...suggestions, start_address: startAddressSuggestion, destination_01: destination01Suggestion, destination_02: destination02Suggestion, destination_03: destination03Suggestion, destination_04: destination04Suggestion, destination_05: destination05Suggestion, currentLocation: currentLocation });
    }, [destination01Suggestion, destination02Suggestion, destination03Suggestion, destination04Suggestion, destination05Suggestion, startAddressSuggestion, currentLocation]);

    const [settingsData, setSettingsData] = useState({});

    //getSettingsData 
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/general-settings`)
            .then(res => res.json())
            .then(data => setSettingsData(data.settings[0]));

    }, [apiKey]);

    let errorMessage = '';
    const CostCalculator = (distance, people, weight) => {
        const { pricePerKm, maxPeople, maxFreePeople, pricePerExtraPeople, maxWeightPerPerson } = settingsData;

        let result = 0;

        if (people <= 0) {
            result = 'N/A';
            errorMessage = 'Unable to calculate the price automaticaly. Please contact support for the price.';
        }
        else {
            if (hqAddressData.length) {
                distance = distance + (hqAddressData.length / 1000);
            }
            result = Math.round(distance * pricePerKm);
            errorMessage = '';

            if (people > maxPeople) {
                result = 'N/A';
                errorMessage = 'Unable to calculate the price automaticaly. The number of people is exceeding our maximum limit. Please contact support for the price.';

            } else if (people > maxFreePeople) {
                const extraPeople = people - maxFreePeople;
                result = Math.round(result + (extraPeople * pricePerExtraPeople));
                errorMessage = '';
            }

            const maxFreeWeight = maxWeightPerPerson * people;

            if (weight > maxFreeWeight) {
                result = 'N/A';
                errorMessage = 'Your luggage weight is exceeding our limit. Please contact support for the price.';
            }

        }
        return result;
    };
    const totalCost = CostCalculator(distance, values.total_people, values.luggage_weight);

    useEffect(() => {
        setValues({ ...values, totalCost: totalCost, distance: distance, hqAddressData: hqAddressData });
    }, [setValues, totalCost, distance, hqAddressData]);

    //current location suggestion
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setDefautlCords({ lat: position.coords.latitude, lng: position.coords.longitude });

            fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${position.coords.latitude}%2C${position.coords.longitude}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setCurrentLocation({ ...data.items[0], isLocationOn: true }));
            // console.log(currentLocation.items[0])
        });
    }, [apiKey]);

    //HQ address
    useEffect(() => {
        if (settingsData.hqAddress === undefined || settingsData.hqAddress.length <= 0) {
            console.log("Firmenadresse is empty.");
        }
        else {
            console.log(settingsData.hqAddress);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${settingsData.hqAddress}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setHQAddress(data));
        }
    }, [apiKey, settingsData.hqAddress, values.start_address]);

    // HQ address langth from start
    useEffect(() => {
        if (hqAddress.items && values.start_address_data) {
            console.log(settingsData.hqAddress);
            fetch(`https://router.hereapi.com/v8/routes?transportMode=car&return=summary&origin=${hqAddress.items[0].position.lat},${hqAddress.items[0].position.lng}&destination=${values.start_address_data.position.lat},${values.start_address_data.position.lng}&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setHQAddressData(data.routes[0].sections[0].summary));
        }
    }, [apiKey, hqAddress.items, settingsData.hqAddress, values.start_address_data]);

    //get deistance from 
    useEffect(() => {
        if (settingsData.hqAddress === undefined || settingsData.hqAddress.length <= 0) {
            console.log("Firmenadresse is empty.");
        }
        else {
            console.log(settingsData.hqAddress);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${settingsData.hqAddress}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setHQAddress(data));
        }
    }, [apiKey, settingsData.hqAddress]);

    //start address suggestions gen
    useEffect(() => {
        if (values.start_address === undefined || values.start_address.length <= 0) {
            console.log("Startadresse is empty.");
        }
        else {
            console.log(values.start_address);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.start_address}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setStartAddressSuggestion(data));
        }
    }, [apiKey, values.start_address]);

    //destination 01 suggestions gen
    useEffect(() => {
        if (values.destination_01 === undefined || values.destination_01.length <= 0) {
            console.log("Destination 01 is empty.");
        }
        else {
            console.log(values.destination_01);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.destination_01}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setDestination01Suggestion(data));
        }
    }, [apiKey, values.destination_01]);

    //destination 02 suggestions gen
    useEffect(() => {
        if (values.destination_02 === undefined || values.destination_02.length <= 0) {
            console.log("Destination 02 is empty.");
        }
        else {
            console.log(values.destination_02);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.destination_02}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setDestination02Suggestion(data));
        }
    }, [apiKey, values.destination_02]);

    //destination 03 suggestions gen
    useEffect(() => {
        if (values.destination_03 === undefined || values.destination_03.length <= 0) {
            console.log("Destination 03 is empty.");
        }
        else {
            console.log(values.destination_03);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.destination_03}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setDestination03Suggestion(data));
        }
    }, [apiKey, values.destination_03]);

    //destination 04 suggestions gen
    useEffect(() => {
        if (values.destination_04 === undefined || values.destination_04.length <= 0) {
            console.log("Destination 04 is empty.");
        }
        else {
            console.log(values.destination_04);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.destination_04}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setDestination04Suggestion(data));
        }
    }, [apiKey, values.destination_04]);

    //destination 05 suggestions gen
    useEffect(() => {
        if (values.destination_05 === undefined || values.destination_05.length <= 0) {
            console.log("Destination 05 is empty.");
        }
        else {
            console.log(values.destination_05);
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${values.destination_05}&lang=en-US&apiKey=${apiKey}`)
                .then(res => res.json())
                .then(data => setDestination05Suggestion(data));
        }
    }, [apiKey, values.destination_05]);

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
        <section id='cost_calculator' className='p-3'>
            <div className="box shadow p-2">
                <h3 className='text-center text-dark'>geschätzte Entfernung & Kosten</h3>
                <div className='m-3'>

                    {(apiKey && values.start_address_data && !values.destination_01_data && !values.destination_02_data && !values.destination_03_data && !values.destination_04_data && !values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords: {
                                            lat: 0,
                                            lng: 0
                                        }
                                    },
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords: {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    }

                                ]
                            }
                        />
                    </div>}

                    {(apiKey && values.start_address_data && values.destination_01_data && !values.destination_02_data && !values.destination_03_data && !values.destination_04_data && !values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination01SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_01_data.position.lat,
                                            lng: values.destination_01_data.position.lng
                                        }
                                    }
                                ]
                            }
                            setDistance={setDistance}
                            distance={distance}
                        />
                    </div>}

                    {(apiKey && values.start_address_data && values.destination_01_data && values.destination_02_data && !values.destination_03_data && !values.destination_04_data && !values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination01SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_01_data.position.lat,
                                            lng: values.destination_01_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination02SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_02_data.position.lat,
                                            lng: values.destination_02_data.position.lng
                                        }
                                    }
                                ]
                            }
                            setDistance={setDistance}
                            distance={distance}
                        />
                    </div>}



                    {(apiKey && values.start_address_data && values.destination_01_data && values.destination_02_data && values.destination_03_data && !values.destination_04_data && !values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [

                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination01SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_01_data.position.lat,
                                            lng: values.destination_01_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination02SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_02_data.position.lat,
                                            lng: values.destination_02_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination03SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_03_data.position.lat,
                                            lng: values.destination_03_data.position.lng
                                        }
                                    }
                                ]
                            }
                            setDistance={setDistance}
                            distance={distance}
                        />
                    </div>}



                    {(apiKey && values.start_address_data && values.destination_01_data && values.destination_02_data && values.destination_03_data && values.destination_04_data && !values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination01SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_01_data.position.lat,
                                            lng: values.destination_01_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination02SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_02_data.position.lat,
                                            lng: values.destination_02_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination03SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_03_data.position.lat,
                                            lng: values.destination_03_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination04SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_04_data.position.lat,
                                            lng: values.destination_04_data.position.lng
                                        }
                                    }
                                ]
                            }
                            setDistance={setDistance}
                            distance={distance}
                        />
                    </div>}


                    {(apiKey && values.start_address_data && values.destination_01_data && values.destination_02_data && values.destination_03_data && values.destination_04_data && values.destination_05_data) && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={{ lat: values.start_address_data.position.lat, lng: values.start_address_data.position.lng }}
                            zoom={14}
                            width="100%"
                            height="350"
                            addressMarkers={
                                [
                                    {
                                        svgMarkup: startAddressSvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.start_address_data.position.lat,
                                            lng: values.start_address_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination01SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_01_data.position.lat,
                                            lng: values.destination_01_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination02SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_02_data.position.lat,
                                            lng: values.destination_02_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination03SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_03_data.position.lat,
                                            lng: values.destination_03_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination04SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_04_data.position.lat,
                                            lng: values.destination_04_data.position.lng
                                        }
                                    },
                                    {
                                        svgMarkup: destination05SvgMarkup,
                                        hidden: false,
                                        coords:
                                        {
                                            lat: values.destination_05_data.position.lat,
                                            lng: values.destination_05_data.position.lng
                                        }
                                    }
                                ]
                            }
                            setDistance={setDistance}
                            distance={distance}
                        />
                    </div>}



                    {!apiKey && <section className='map card rounded shadow mb-3 d-flex'> <div className='text-center mt-5 pt-5 px-2'><h4 className='mt-5'>Please set  here.com api on settings page to use this function.</h4></div> </section>}

                    {!values.start_address_data && <div className='rounded shadow mb-3'>
                        <DisplayMapFC
                            apikey={apiKey}
                            center={defautlCords}
                            zoom={7}
                            width="100%"
                            height="350"
                        />
                    </div>}
                    <br />
                    {hqAddress.items &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> unser Firmensitz: </strong><span title={`lat: ${hqAddress.items[0].position.lat}, lng: ${hqAddress.items[0].position.lng}`} >{hqAddress.items[0].title}</span></small>
                    }

                    {values.start_address_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Start:</strong> <span title={`lat: ${values.start_address_data.position.lat}, lng: ${values.start_address_data.position.lng}`} >{values.start_address_data.title}</span>  </small>
                    }
                    {values.destination_02_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Stop 01:</strong> <span title={`lat: ${values.destination_02_data.position.lat}, lng: ${values.destination_02_data.position.lng}`} >{values.destination_02_data.title}</span>  </small>
                    }
                    {values.destination_03_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Stop 02:</strong> <span title={`lat: ${values.destination_03_data.position.lat}, lng: ${values.destination_03_data.position.lng}`} >{values.destination_03_data.title}</span>  </small>
                    }
                    {values.destination_04_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Stop 03:</strong> <span title={`lat: ${values.destination_04_data.position.lat}, lng: ${values.destination_04_data.position.lng}`} >{values.destination_04_data.title}</span>  </small>
                    }
                    {values.destination_05_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Stop 04:</strong> <span title={`lat: ${values.destination_05_data.position.lat}, lng: ${values.destination_05_data.position.lng}`} >{values.destination_05_data.title}</span>  </small>
                    }
                    {values.destination_01_data &&
                        <small className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 384 512">
                            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                            <strong> Final Destinaton:</strong> <span title={`lat: ${values.destination_01_data.position.lat}, lng: ${values.destination_01_data.position.lng}`} >{values.destination_01_data.title}</span>  </small>
                    }
                    <hr />

                    <h6 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                        <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                    </svg> <strong>Gesamtentfernung:</strong> {distance} km</h6>
                    <h6 className='d-block'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                    </svg> <strong>Passagiere:</strong> {values.total_people}</h6>

                    <hr />


                    <h5 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                    </svg> <strong>Gesamtkosten:</strong> {totalCost} {settingsData.currencySymbole}</h5>
                    <span className="text-danger">{errorMessage}</span>

                    <div className='ms-auto'>
                        <button className='btn btn-outline-danger me-2 mt-3'>zurücksetzen</button>
                        <button className='btn btn-outline-dark mt-3'>finden Sie mich auf der Karte</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingCostCalculator;
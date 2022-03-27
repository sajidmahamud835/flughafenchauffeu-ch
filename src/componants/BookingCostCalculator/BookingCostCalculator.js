import React from 'react';

const BookingCostCalculator = () => {
    return (
        <section id='cost_calculator' className='p-3'>
            <div className="box shadow-sm p-2">
                <h3 className='text-center text-dark'>Estimated Distance & Cost</h3>
                <div className='m-3'>
                    <iframe width="100%" height="400px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/marine-gps/">navigation gps</a></iframe>
                    <h6 className='d-block'>Distance: 0.00 CHF</h6>
                    <h6 className='d-block'>Cost: 0.00 CHF</h6>
                    <hr />
                    <h5 className='d-block'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                    </svg> Total Cost: 0.00 CHF</h5>

                    <button className='btn btn-outline-danger me-2'>Back</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
        </section>
    );
};

export default BookingCostCalculator;
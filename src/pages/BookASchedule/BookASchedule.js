import { React } from 'react';
import BookingCostCalculator from '../../componants/BookingCostCalculator/BookingCostCalculator';
import BookingProcess from '../../componants/BookingProcess/BookingProcess';

const BookASchedule = () => {

    return (
        <div className='container'>
            <div className="row">

                <div className="col-lg-7">
                    <BookingProcess />
                </div>

                <div className="col-lg-5">
                    <BookingCostCalculator />
                </div>

            </div>
        </div>
    );
};

export default BookASchedule;



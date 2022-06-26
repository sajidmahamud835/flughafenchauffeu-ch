import { React, CSSProperties, useState } from 'react';
import BookingCostCalculator from '../../componants/BookingCostCalculator/BookingCostCalculator';
import BookingProcess from '../../componants/BookingProcess/BookingProcess';
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const BookASchedule = () => {
    //loading spinner
    let [loading, setLoading] = useState(true);

    return (
        <div className='container'>
            {
                loading &&
                <div
                    style={{
                        left: '50%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: '35%',
                    }}
                    className="sweet-loading" >
                    <ClipLoader color='ffffff' loading={loading} cssOverride={override} size={150} />
                </div >

            }
            <div className={`row ${loading && "d-none"}`}>

                <div className="col-lg-7">
                    <BookingProcess setLoading={setLoading} />
                </div>

                <div className="col-lg-5">
                    <BookingCostCalculator />
                </div>

            </div>
        </div>
    );
};

export default BookASchedule;



import React from 'react';

const AddOrRemoveBtn = (props) => {
    let display = "";
    if (props.display === true) {
        display = "";
    } else {
        display = {
            display: "none",
            order: 0
        };
    }
    return (
        <div className='col py-3' style={{ display: display.display }} >
            <button id='add' onClick={() => props.addInput([...props.inputs, props.newDestination])} className='btn btn-primary rounded-pill mt-5'> <b>+</b> </button>
            <button id='remove' onClick={() => {
                props.addInput([...props.inputs.pop()])

            }} className='btn btn-danger rounded-pill mt-5 ms-1'> <b>-</b> </button>
        </div>
    );
};

export default AddOrRemoveBtn;
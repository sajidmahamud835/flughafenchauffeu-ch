import React from 'react';
import { DisplayMapFC } from '../../DisplayMapFC';

const MapBox = (props) => {
    return (
        <div>
            <DisplayMapFC
                apikey={props.apikey}
                center={props.center}
                zoom={props.zoom}
                width={props.width}
                height={props.height}
            />
        </div>
    );
};

export default MapBox;
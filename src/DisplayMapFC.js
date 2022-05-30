import * as React from 'react';

export const DisplayMapFC = (props) => {
    const { apikey, center, zoom } = props;
    const addressMarker = { startAddress: { lat: 52.53075, lng: 13.3851 }, destination01: { lat: 40.53075, lng: 10.3851 } };
    // Create a reference to the HTML element we want to put the map on
    const mapRef = React.useRef(null);

    /**
     * Create the map instance
     * While `useEffect` could also be used here, `useLayoutEffect` will render
     * the map sooner
     */
    React.useLayoutEffect(() => {
        // `mapRef.current` will be `undefined` when this hook first runs; edge case that
        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: apikey
        });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: center,
            zoom: zoom,
            pixelRatio: window.devicePixelRatio || 1
        });

        /* Marks the start address */
        const startAddressSvgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">S</text></svg>';

        const startAddressIcon = new H.map.Icon(startAddressSvgMarkup),
            startAddressCoords = addressMarker.startAddress,
            startAddressMarker = new H.map.Marker(startAddressCoords, { icon: startAddressIcon });
        hMap.addObject(startAddressMarker);

        /* Marks the start address */
        const destination01SvgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">D1</text></svg>';

        const destination01Icon = new H.map.Icon(destination01SvgMarkup),
            destination01Coords = addressMarker.destination01,
            destination01Marker = new H.map.Marker(destination01Coords, { icon: destination01Icon });
        hMap.addObject(destination01Marker);



        /* Makes the map interactive */
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        const ui = H.ui.UI.createDefault(hMap, defaultLayers);


        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
            hMap.dispose();
        };
    }, [apikey, center, mapRef, zoom]); // This will run this hook every time this ref is updated

    return <div
        className="map"
        ref={mapRef}
        style={{ width: "100%", height: "320px" }}
    />;
};
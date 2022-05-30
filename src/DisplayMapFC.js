import * as React from 'react';

export const DisplayMapFC = (props) => {
    const { apikey, center, zoom, addressMarkers, showMarker } = props;
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
        if (addressMarkers) {
            addressMarkers.map(addressMarker => {
                if (addressMarker.coords.lat !== undefined) {
                    const addressIcon = new H.map.Icon(addressMarker.svgMarkup),
                        addressCoords = addressMarker.coords,
                        newMarker = new H.map.Marker(addressCoords, { icon: addressIcon });
                    hMap.addObject(newMarker);
                }
                return 0;
            })
        }



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
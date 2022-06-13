import * as React from 'react';

export const DisplayMapFC = (props) => {
    const { apikey, center, zoom, addressMarkers, setDistance, distance } = props;
    const [stopCoords, setStopCoords] = React.useState([]);
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

        /* Marks the start and destination addresses */
        if (addressMarkers) {
            let i = 0;
            addressMarkers.map(addressMarker => {
                if (addressMarker.coords.lat !== undefined) {
                    const addressIcon = new H.map.Icon(addressMarker.svgMarkup),
                        addressCoords = addressMarker.coords,
                        addressCoordsString = `${addressCoords.lat},${addressCoords.lng}`,
                        newMarker = new H.map.Marker(addressCoords, { icon: addressIcon });
                    hMap.addObject(newMarker);

                    if (i > 1) {
                        setStopCoords([...stopCoords, addressCoordsString]); //adds coords to an array so for routing path
                        // console.log('Stop Cords', stopCoords)
                    }

                    i++;
                }
                return 0;
            })
        }
        //Verify if there is any additonal stops
        if (addressMarkers) {

            // Create the parameters for the routing request:
            let routingParameters = {
                'routingMode': 'fast',
                'transportMode': 'car',
                // The start point of the route:
                'origin': `${addressMarkers[0].coords.lat},${addressMarkers[0].coords.lng}`,
                // The end point of the route:
                'destination': `${addressMarkers[1].coords.lat},${addressMarkers[1].coords.lng}`,
                // Include the route shape in the response
                'return': 'polyline,travelSummary'
            };

            if (stopCoords.length > 0) {
                routingParameters = {
                    'routingMode': 'fast',
                    'transportMode': 'car',
                    // The start point of the route:
                    'origin': `${addressMarkers[0].coords.lat},${addressMarkers[0].coords.lng}`,
                    'destination': `${addressMarkers[1].coords.lat},${addressMarkers[1].coords.lng}`,
                    // defines multiple waypoints
                    'via': new H.service.Url.MultiValueQueryParameter(stopCoords),
                    // Include the route shape in the response
                    'return': 'polyline,travelSummary'
                };
            } else if (addressMarkers.length <= 1) {
                routingParameters = {
                    'routingMode': 'fast',
                    'transportMode': 'car',
                    // The start point of the route:
                    'origin': `${addressMarkers[0].coords.lat},${addressMarkers[0].coords.lng}`,
                    // The end point of the route:
                    'destination': `${addressMarkers[0].coords.lat},${addressMarkers[0].coords.lng}`,
                    // Include the route shape in the response
                    'return': 'polyline,travelSummary'
                };
            }


            // Define a callback function to process the routing response:
            const onResult = function (result) {
                // ensure that at least one route was found
                // console.log(result);
                if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        if (distance === 0) {
                            setDistance(section.travelSummary.length / 1000);
                        }
                        // Create a linestring to use as a point source for the route line
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                        // Create a polyline to display the route:
                        let routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: 'blue', lineWidth: 4 }
                        });
                        /*
    
                        Replace the polyline with arrow
                                            // Create an outline for the route polyline:
                                            var routeOutline = new H.map.Polyline(linestring, {
                                                style: {
                                                    lineWidth: 10,
                                                    strokeColor: 'rgba(0, 128, 255, 0.7)',
                                                    lineTailCap: 'arrow-tail',
                                                    lineHeadCap: 'arrow-head'
                                                }
                                            });
                                            // Create a patterned polyline:
                                            var routeArrows = new H.map.Polyline(linestring, {
                                                style: {
                                                    lineWidth: 10,
                                                    fillColor: 'white',
                                                    strokeColor: 'rgba(255, 255, 255, 1)',
                                                    lineDash: [0, 2],
                                                    lineTailCap: 'arrow-tail',
                                                    lineHeadCap: 'arrow-head'
                                                }
                                            }
                                            );
                                            // create a group that represents the route line and contains
                                            // outline and the pattern
                                            var routeLine = new H.map.Group();
                                            routeLine.addObjects([routeOutline, routeArrows]);
                        */
                        // Create a marker for the start point:
                        let startMarker = new H.map.Marker(section.departure.place.location);

                        // Create a marker for the end point:
                        let endMarker = new H.map.Marker(section.arrival.place.location);

                        // Add the route polyline and the two markers to the map:
                        hMap.addObjects([routeLine, startMarker, endMarker]);

                        // Set the map's viewport to make the whole route visible:
                        hMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });

                    });
                }
            };

            // Get an instance of the routing service version 8:
            const router = platform.getRoutingService(null, 8);

            // Call calculateRoute() with the routing parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            router.calculateRoute(routingParameters, onResult,
                function (error) {
                    alert(error.message);
                });
        }

        /* Makes the map interactive */
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        const ui = H.ui.UI.createDefault(hMap, defaultLayers);


        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
            hMap.dispose();
        };
    }, [addressMarkers, apikey, center, mapRef, zoom]); // This will run this hook every time this ref is updated

    return <div
        className="map"
        ref={mapRef}
        style={{ width: "100%", height: "320px" }}
    />;
};
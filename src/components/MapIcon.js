
import L from 'leaflet';

const MapIcon = new L.Icon({
    iconUrl: require('../images/pin.svg'),
    iconRetinaUrl: require('../images/pin.svg'),
    iconSize: new L.Point(30, 37),
    className: 'l'
});

export { MapIcon };
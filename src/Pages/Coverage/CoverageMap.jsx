import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Helper Component ot move map--------------
const FlyToDistrict = ({ position }) => {
    const map = useMap();
    if (position) {
        map.flyTo(position, 10, { duration: 1.5 })
    }
    return null;
};

const CoverageMap = ({ deliveryLocation, activePosition }) => {
    return (
        <MapContainer
            center={[23.8103, 90.4125]}
            zoom={7}
            className="h-200 w-full rounded-lg"
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToDistrict position={activePosition}></FlyToDistrict>
            {
                deliveryLocation.map((centre, idx) => (
                    <Marker key={idx} position={[centre.latitude, centre.longitude]}>
                        <Popup>
                            <strong className='text-xl'>{centre.district}</strong>
                            <br />
                            {centre.covered_area.join(',')}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};

export default CoverageMap;
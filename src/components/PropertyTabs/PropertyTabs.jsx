import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./PropertyTabs.css";

export default function PropertyTabs({ property }) {
  return (
    <Tabs className="property-tabs">
      <TabList>
        <Tab>Description</Tab>
        <Tab>Map</Tab>
      </TabList>

      <TabPanel>
        {/* React escapes this text automatically, so it is safe even though
            it originates from the JSON data file. */}
        <p className="tab-description">{property.description}</p>
      </TabPanel>

      <TabPanel>
        <div className="map-wrapper">
          <MapContainer
            center={[property.map.lat, property.map.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "360px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[property.map.lat, property.map.lng]}>
              <Popup>{property.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </TabPanel>
    </Tabs>
  );
}

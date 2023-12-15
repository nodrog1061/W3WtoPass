import { useState, useContext } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  ZoomControl,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { w3wApiKey } from "../firebase/config.js";
import { useAuthStore } from "../context/authState.jsx";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoibm9kcm9nMTA2MSIsImEiOiJja3o2Mm01ZHgwN3JmMm5uOWhlOXVkbjJmIn0.MSOX9r2jMttsdLgIXRNASQ",
});

export async function coordinatesToW3W(latLng, setw3wLoc) {
  const { latitude, longitude } = latLng;
  const url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${latitude}%2C${longitude}&key=${w3wApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  setw3wLoc(data.words.split("."));
}

export default function MapComponent({ login = false }) {
  const locLimited = false;
  const { setw3wLoc, setCoordinates, coordinates } = useAuthStore();

  const handleMapClick = async (map, evt) => {
    setCoordinates([evt.lngLat.lng, evt.lngLat.lat]);
    console.log(evt.lngLat.lng, evt.lngLat.lat);
    if (!login) {
      coordinatesToW3W(
        { latitude: evt.lngLat.lat, longitude: evt.lngLat.lng },
        setw3wLoc,
      )
    }
  };

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "300px",
          width: "100%",
        }}
        onClick={handleMapClick}
        maxBounds={
          locLimited && [
            [-0.1885, 51.4379],
            [0.0287, 51.5851],
          ]
        }
        fitBounds={
          locLimited && [
            [-0.1885, 51.4379],
            [0.0287, 51.5851],
          ]
        }
      >
        <ZoomControl />
        { coordinates[0] !== undefined &&
          <Marker coordinates={coordinates} anchor="bottom">
            <img
              className="w-16"
              src="https://raw.githubusercontent.com/mapbox/mapbox-gl-styles/master/sprites/basic-v9/_svg/marker-11.svg"
            />
          </Marker>
        }
      </Map>
    </>
  );
}

import React from "react";
import { Label } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import config from "../../config";

const mapStyle = require("./mapStyle.json");

// Schools-Data
// @TODO Replace static Data through Database-Data via Axios-Call
const schulen = [
  {
    name: "Tanzschule Ring3",
    short: "Ring3",
    coords: { lat: 53.647072, lng: 10.057243 },
    tags: ["Paartanz", "Steppen", "Hip-Hop", "Zumba"]
  },
  { name: "Mein Tanzstudio", short: "Mein Tanzstudio", coords: { lat: 53.562643, lng: 10.07141 }, tags: ["Paartanz", "Ballet", "Yoga"] },
  { name: "Tanzschule S-Eins", short: "S-Eins", coords: { lat: 53.661095, lng: 10.086359 }, tags: ["Paartanz", "Schauspiel", "Gesang"] },
  {
    name: "Walter Bartel",
    short: "W. Bartel",
    coords: { lat: 53.569014, lng: 10.026308 },
    tags: ["Paartanz", "Yoga", "Hip-Hop"]
  },
  {
    name: "Schrittmacher",
    short: "Schrittmacher",
    coords: { lat: 53.560927, lng: 9.916891 },
    tags: ["Paartanz", "Swing", "Dancehall"]
  },
  {
    name: "Tangostudio el abrazo",
    short: "el abrazo",
    coords: { lat: 53.564711, lng: 9.921243 },
    tags: ["Tango Argentino"]
  },
  {
    name: "Ballettstudio Gitta Luckau",
    short: "Gitta Luckau",
    coords: { lat: 53.574244, lng: 10.019879 },
    tags: ["Ballett"]
  }
];

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: config.coords["Hamburg"],
      zoom: 14,
      currentPosition: { lat: 0, lng: 0 }
    };

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentPosition: { lat: position.coords.latitude, lng: position.coords.longitude }
      });
      console.log(position.coords.accuracy);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ center: nextProps.center, currentPosition: this.state.currentPosition });
  }

  /**
   * Handles Change of Map-Center via drag
   * @param  {Object} center Coordinates of Map-Center
   * @param  {String} zoom   Zoom-Level defined by GoogleMapReact
   */
  _onChange = ({ center, zoom }) => {
    this.setState({
      center,
      zoom
    });
  };

  /**
   * Sets Coordinates of Place as Center and changes Zoom-Level
   * @param  {Object} e   Synthetic prevent
   * @param  {String} lat latitude
   * @param  {String} lng longitude
   */
  placeClick = (e, { lat, lng }) => {
    this.setState({ center: { lat: lat, lng: lng }, zoom: 16 });
  };

  render() {
    return (
      <GoogleMapReact
        onChange={this._onChange}
        center={this.state.center}
        zoom={this.state.zoom}
        style={{ marginTop: "50px", height: "500px" }}
        options={{ fullscreenControl: false, styles: mapStyle }}>
        {schulen.map((schule, index) => {
          if (this.state.zoom > 13) {
            return (
              <Label
                tag
                // basic
                as="nobr" // Rendered as "nobr" to prevent linebrak through hyphens
                color="black"
                style={{ transform: "translate(2px, -48%)", cursor: "pointer" }}
                key={schule.name + index}
                lat={schule.coords.lat}
                lng={schule.coords.lng}
                onClick={this.placeClick}>
                {schule.short}
              </Label>
            );
          } else {
            return (
              <Label
                circular
                empty
                color="red"
                style={{ transform: "translate(-50%, -50%" }}
                key={schule.name}
                lat={schule.coords.lat}
                lng={schule.coords.lng}
                onClick={this.placeClick}
              />
            );
          }
        })}

        <Label
          empty
          circular
          color="blue"
          size="large"
          style={{
            boxShadow: "0 0 0 2px white, 0 0 0 " + (this.state.zoom * 4 - 30) + "px rgba(0,0,255,0.1)",
            width: "1em",
            transform: "translate(-46%,-44%)"
          }}
          lat={this.state.currentPosition.lat}
          lng={this.state.currentPosition.lng}
        />
      </GoogleMapReact>
    );
  }
}

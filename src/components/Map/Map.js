import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import mapImg from "../../images/mapPlaceholder.png";
import PropTypes from "prop-types";
import strings from "./strings";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false
    };
  }

  coordinates = () => {
    switch (this.props.location) {
      case "QLD":
        return { lat: -27.4698, lng: 153.0251 };
      case "NSW":
        return { lat: -33.8688, lng: 151.2093 };
      case "SA":
        return { lat: -34.9285, lng: 138.6007 };
      case "NT":
        return { lat: -12.4634, lng: 130.8456 };
      case "VIC":
        return { lat: -37.8136, lng: 144.9631 };
      case "WA":
        return { lat: -31.9505, lng: 115.8605 };
      case "ACT":
        return { lat: -35.2809, lng: 149.13 };
      case "TAS":
        return { lat: -42.8821, lng: 147.3272 };
      default:
        return { lat: 0, lng: 0 }; // <- TODO return an error message instead
    }
  };

  render() {
    //user must click the map placeholder in order to render the map
    const containerContents = this.state.showMap ? (
      <MapView
        style={styles.map}
        region={{
          latitude: this.coordinates().lat,
          longitude: this.coordinates().lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    ) : (
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => this.setState({ showMap: true })}
      >
        <View style={styles.mapImg}>
          <Image source={mapImg} style={styles.placeholderImg} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{strings.clickToShow}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );

    return (
      <View style={styles.parent}>
        <View style={styles.mapContainer}>{containerContents}</View>
      </View>
    );
  }
}

Map.propTypes = {
  location: PropTypes.string.isRequired
};

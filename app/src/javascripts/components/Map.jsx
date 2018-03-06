import React, { Component } from 'react';
import PropTypes from 'prop-types';
import controllable from 'react-controllables';
import GoogleMapReact from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import mockData from '../../mockData';
import MapMarker from '../components/MapMarker.jsx';
import handleMarkerClick from '../helpers/handleMarkerClick';

import { MARKER_DIAMETER } from '../styles/mapMarkerStyles';

const Map = controllable(['center', 'zoom', 'hoverKey', 'clickKey'])(
  class Map extends Component {
    static propTypes = {
      center: PropTypes.array, // @controllable
      zoom: PropTypes.number, // @controllable
      hoverKey: PropTypes.string, // @controllable
      clickKey: PropTypes.string, // @controllable
    };

    static defaultProps = {
      center: { lat: 40.744679, lng: -73.948542 },
      zoom: 11,
      locations: mockData,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
      super(props);
    }

    onMarkerMouseEnter = key => {
      this.props.onHoverKeyChange(key);
      console.log('on hover key change (enter)');
    };

    onMarkerMouseLeave = () => {
      this.props.onHoverKeyChange(null);
      console.log('on hover key change (leave)');
    };

    render() {
      const mapLocations = this.props.locations;

      const generateMarkers = mapLocations => {
        return mapLocations.map((location, index) => {
          console.log(location);
          console.log('this.props.hoverKey', this.props.hoverKey);
          console.log('location.id', location.id);
          console.log('this.props.hoverKey === location.id', this.props.hoverKey === location.id);
          return (
            <MapMarker
              key={location.id}
              lat={location.lat}
              lng={location.lon}
              text={''}
              hover={this.props.hoverKey == location.id}
            />
          );
        });
      };

      return (
        <div className="google-map">
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{ key: 'AIzaSyDxJRIxEgWCGd2u-a_ZaucTTO3_DzHHL4U' }}
            onChildClick={handleMarkerClick}
            hoverDistance={MARKER_DIAMETER / 2}
            onChildMouseEnter={this.onMarkerMouseEnter}
            onChildMouseLeave={this.onMarkerMouseLeave}
          >
            {generateMarkers(mockData)}
          </GoogleMapReact>
        </div>
      );
    }
  }
);

export default Map;
import React from 'react';
import classnames from 'classnames';
import GoogleMapReact from 'google-map-react';
import withMapContainer from '@containers/MapContainer';
import H1 from '@components/Texts/H1';
// import classes from './MapMain.scss';
import mapstyle from './mapstyle.json';
import IconCar from './icon.svg';

const AnyReactComponent = () => <IconCar width={32} />;

function options(/* maps */) {
  return {
    fullscreenControl: false,
    scaleControl: false,
    scrollwheel: false,
    overviewMapControl: false,
    streetViewControl: false,
    rotateControl: false,
    mapTypeControl: false,
    // disable poi
    styles: mapstyle,
  };
}

@withMapContainer
class MapMain extends React.Component {
  state = {
    lat: 59.95,
    lng: 30.33,
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => {
        const lat = prevState.lat - 0.00001;
        const lng = prevState.lng - 0.00001;
        return {
          lat,
          lng,
        };
      });
    }, 500);
  }

  renderMap() {
    return (
      <div className={classes.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCSMnCZmuvVIpQa7-3GkgHFZ913h9X9JZs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={options}
        >
          <AnyReactComponent
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }

  render() {
    const { fetchTweets, isRequesting } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          {isRequesting ? <div>Loading</div> : this.renderMap()}
        </div>
        <div className={classes.right} />
      </div>
    );
  }
}

export default MapMain;

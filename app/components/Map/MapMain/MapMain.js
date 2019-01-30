import React from 'react';
import withMapContainer from '@containers/MapContainer';
import H1 from '@components/Texts/H1';

@withMapContainer
class MapMain extends React.Component {
  render() {
    const { fetchTweets, isRequesting } = this.props;
    return (
      <div>
        <H1>Map</H1>
        {isRequesting && <div>Loading</div>}

        <button onClick={fetchTweets}>Fetch Tweet</button>
      </div>
    );
  }
}

export default MapMain;

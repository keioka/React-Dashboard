import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { filterTable, fetchTweets } from '@actions/index';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // onFilter: filterText => dispatch(filterTable(filterText)),
  // fetchTweets: () => dispatch(fetchTweets()),
});

const withMapContainer = (Component) => {
  @connect(
    mapStateToProps,
    mapDispatchToProps,
  )
  class MapContainer extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  MapContainer.propTypes = {
    allTweets: PropTypes.object,
    onFilter: PropTypes.func,
  };

  return MapContainer;
};

export default withMapContainer;

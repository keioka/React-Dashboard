import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import actions from '@redux/actions';

const mapStateToProps = state => ({
  isOnline: state.clientStatus.isOnline,
});

const mapDispatchToProps = dispatch => ({
  changeOnlineStatus: status => dispatch(actions.changeOnlineStatus({ status })),
});

const withClientStatusContainer = (Component) => {
  @connect(
    mapStateToProps,
    mapDispatchToProps,
  )
  class ClientStatusContainer extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  ClientStatusContainer.propTypes = {
    isOnline: PropTypes.bool,
    changeOnlineStatus: PropTypes.func,
  };

  return ClientStatusContainer;
};

export default withClientStatusContainer;

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login, signup } from '@redux/actions';
import actions from '@redux/actions';

const mapStateToProps = state => ({
  isRequesting: state.auth.isRequesting,
  isLogined: state.auth.isLogined,
});

const mapDispatchToProps = dispatch => ({
  login: auth => dispatch(actions.login(auth)),
  signup: auth => dispatch(actions.signup(auth)),
});

const withAuthContainer = (Component) => {
  @connect(
    mapStateToProps,
    mapDispatchToProps,
  )
  class AuthContainer extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  AuthContainer.propTypes = {
    signup: PropTypes.func,
    login: PropTypes.func,
  };

  return AuthContainer;
};

export default withAuthContainer;

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login, signup } from '@redux/actions';
import actions from '@redux/actions';

const mapStateToProps = state => ({
  allPosts: state.post.all,
  isLoading: state.post.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(actions.fetchPost(id)),
});

const withPostContainer = (Component) => {
  @connect(
    mapStateToProps,
    mapDispatchToProps,
  )
  class PostContainer extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  PostContainer.propTypes = {
    allPosts: PropTypes.array,
    fetchPost: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  return PostContainer;
};

export default withPostContainer;

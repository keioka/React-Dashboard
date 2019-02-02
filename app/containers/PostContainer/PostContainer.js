import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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
    fetchPost: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    allPosts: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number,
    })),
  };

  PostContainer.defaultProps = {
    allPosts: [],
  };

  return PostContainer;
};

export default withPostContainer;

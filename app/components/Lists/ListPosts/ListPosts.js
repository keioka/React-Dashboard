import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import withPostContainer from '@containers/PostContainer';

import classes from './ListPosts.scss';

@withPostContainer
class ListPosts extends React.Component {
  componentWillMount() {
    const { fetchPost } = this.props;
    fetchPost();
  }

  handleClickButton = () => {};

  render() {
    const { allPosts, isLoading } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={classes.element}>
        {allPosts && allPosts.map(post => <div className={classes.item}>{post.title}</div>)}
      </div>
    );
  }
}
ListPosts.propTypes = {};

ListPosts.defaultProps = {};

export default ListPosts;

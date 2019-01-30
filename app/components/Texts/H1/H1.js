import React from 'react';
import classnames from 'classnames';
import classes from './H1.scss';

const H1 = ({ className, children }) => (
  <h1 className={classnames(className, classes.element)}>{children}</h1>
);

H1.propTypes = {};

H1.defaultProps = {};

export default H1;

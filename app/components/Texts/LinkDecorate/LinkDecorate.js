import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import classes from './LinkDecorate.scss';

const LinkDecorate = ({ className, children, to }) => (
  <Link className={classnames(className, classes.element)} to={to}>
    {children}
  </Link>
);

LinkDecorate.propTypes = {};

LinkDecorate.defaultProps = {};

export default LinkDecorate;

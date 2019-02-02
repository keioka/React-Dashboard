import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './H1.scss';

const H1 = ({ className, children }) => (
  <h1 className={classnames(className, classes.element)}>{children}</h1>
);

H1.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

H1.defaultProps = {
  className: null,
};

export default H1;

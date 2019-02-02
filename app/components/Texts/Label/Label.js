import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './Label.scss';

const Label = ({ className, children, htmlFor }) => (
  <label className={classnames(className, classes.element)} htmlFor={htmlFor}>{children}</label>
);

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

Label.defaultProps = {
  className: null,
  htmlFor: '',
};

export default Label;

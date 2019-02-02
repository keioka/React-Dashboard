import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './Button.scss';

const Button = ({ className, children, onClick }) => (
  <div className={classnames(className, classes.element)} onClick={onClick}>
    {children}
  </div>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;

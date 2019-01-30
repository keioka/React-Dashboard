import React from 'react';
import classnames from 'classnames';
import classes from './Button.scss';

const Button = ({ className, children, onClick }) => (
  <div className={classnames(className, classes.element)} onClick={onClick}>
    {children}
  </div>
);

Button.propTypes = {};

Button.defaultProps = {};

export default Button;

import React from 'react';
import classnames from 'classnames';
import classes from './Label.scss';

const Label = ({ className, children }) => (
  <label className={classnames(className, classes.element)}>{children}</label>
);

Label.propTypes = {};

Label.defaultProps = {};

export default Label;

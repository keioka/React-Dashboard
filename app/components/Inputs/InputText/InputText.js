import React from 'react';
import classnames from 'classnames';
import classes from './InputText.scss';

const InputText = ({ className, onChange }) => (
  <input type="text" className={classnames(className, classes.element)} onChange={onChange} />
);

InputText.propTypes = {};

InputText.defaultProps = {};

export default InputText;

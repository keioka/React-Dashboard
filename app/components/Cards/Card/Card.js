import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './Card.scss';

const Card = ({ className, children }) => (
  <div className={classnames(className, classes.elememnt)}>{children}</div>
);

Card.propTypes = {};

Card.defaultProps = {};

export default Card;

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';

import classes from './TopMessageBar.scss';

const TopMessageBar = ({ className, children, onClickClose }) => (
  <div className={classnames(className, classes.elememnt)}>
    <div className={classes.inner}>{children}</div>
    <div className={classes.btnClose}>
      <IoMdCloseCircle />
    </div>
  </div>
);

TopMessageBar.propTypes = {};

TopMessageBar.defaultProps = {};

export default TopMessageBar;

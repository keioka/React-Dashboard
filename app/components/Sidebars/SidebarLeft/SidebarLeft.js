import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import classes from './SidebarLeft.scss';

const SidebarLeft = ({ className, children }) => (
  <div className={classnames(className, classes.elememnt)}>
    <div className={classes.boxUserInfo}>
      <span className={classes.boxUserInfoUserName}>Kei Oka</span>
      <span className={classes.boxUserInfoCityName}>San Francisco</span>
    </div>
    <div className={classes.inner}>
      <div className={classes.h5}>Main Menu</div>
      <ul className={classes.list}>
        <li className={classes.itemMenu}>
          <Link to="/" className={classes.link}>
            Map
          </Link>
        </li>
        <li className={classes.itemMenu}>
          <Link to="/about" className={classes.link}>
            About
          </Link>
        </li>
        <li className={classes.itemMenu}>
          <Link to="/posts" className={classes.link}>
            Post
          </Link>
        </li>
        <li className={classes.itemMenu}>menu4</li>
        <li className={classes.itemMenu}>menu5</li>
      </ul>
    </div>
  </div>
);

SidebarLeft.propTypes = {};

SidebarLeft.defaultProps = {};

export default SidebarLeft;

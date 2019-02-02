import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { FiMap, FiBarChart, FiLayers } from 'react-icons/fi';

import classes from './SidebarLeft.scss';

const SidebarLeft = ({ className, children }) => (
  <div className={classnames(className, classes.element)}>
    <div className={classes.boxUserInfo}>
      <span className={classes.boxUserInfoUserName}>Kei Oka</span>
      <span className={classes.boxUserInfoCityName}>San Francisco</span>
    </div>
    <div className={classes.inner}>
      <div className={classes.h5}>Main Menu</div>
      <ul className={classes.list}>
        <Link to="/" className={classes.link}>

          <li className={classes.itemMenu}>
          <FiMap className={classes.icon} />
          <span className={classes.itemMenuTitle}>Map</span>
        </li>
        </Link>

        <Link to="/about" className={classes.link}>

          <li className={classes.itemMenu}>
            <FiBarChart className={classes.icon} />
            <span className={classes.itemMenuTitle}>Line Graph</span>
          </li>
        </Link>
        <Link to="/posts" className={classes.link}>

          <li className={classes.itemMenu}>
            <FiLayers className={classes.icon} />
            <span className={classes.itemMenuTitle}>Post</span>
          </li>
        </Link>

      </ul>
    </div>
  </div>
);

SidebarLeft.propTypes = {
  className: PropTypes.string,
};

SidebarLeft.defaultProps = {
  className: null,
};

export default SidebarLeft;

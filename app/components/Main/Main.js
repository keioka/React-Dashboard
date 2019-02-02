import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import universal from 'react-universal-component';
import withClientStatusContainer from '@containers/ClientStatusContainer';
import SidebarLeft from '@components/Sidebars/SidebarLeft';
import TopMessageBar from '@components/Sidebars/TopMessageBar';
import shallowCompare from 'react-addons-shallow-compare';
import { IoMdNotificationsOutline } from 'react-icons/io';

import classes from './Main.scss';

const MapMain = universal(import(/* webpackChunkName: "MapMain" */ '../Map/MapMain'));
const About = universal(import(/* webpackChunkName: "About" */ '../About'));
const Post = universal(import(/* webpackChunkName: "Auth" */ '../Post'));

const iconOnline = (
  <span className={classes.headerOnlineStatus}>
    <span className={classes.headerOnlineStatusText}>
      online
    </span>
  </span>
);

const iconOffline = (
  <span className={classes.headerOfflineStatus}>
    <span className={classes.headerOfflineStatusText}>
      offline
    </span>
  </span>
);
@withClientStatusContainer
class Main extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(nextProps, this.props);
  }

  componentDidCatch(error, info) {
    console.log(error);

    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  render() {
    const { isOnline } = this.props;
    const currentkey = location.pathname.split('/')[1] || '';
    return (
      <div className={classes.root}>
        <SidebarLeft className={classes.sidebarLeft} />
        <div className={classes.main}>
          <header className={classes.header}>
            <span className={classes.headerLeft}>
              {isOnline ? iconOnline : iconOffline}
            </span>
            <nav className={classes.headerRight}>
              <IoMdNotificationsOutline size={24} />
              <IoMdNotificationsOutline size={24} />
            </nav>
          </header>
          <TransitionGroup>
            <CSSTransition
              key={currentkey}
              classNames="page"
              timeout={500}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <Switch>
                  <Route exact path="/" component={MapMain} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/posts" component={Post} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <footer className={classes.footer} />
      </div>
    );
  }
}

Main.propTypes = {};

Main.defaultProps = {};

export default hot(module)(Main);

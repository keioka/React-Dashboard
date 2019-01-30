import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import universal from 'react-universal-component';
import withClientStatusContainer from '@containers/ClientStatusContainer';
import SidebarLeft from '@components/Sidebars/SidebarLeft';
import TopMessageBar from '@components/Sidebars/TopMessageBar';

import classes from './Main.scss';

const MapMain = universal(import(/* webpackChunkName: "MapMain" */ '../Map/MapMain'));
const About = universal(import(/* webpackChunkName: "About" */ '../About'));
const Post = universal(import(/* webpackChunkName: "Auth" */ '../Post'));

@withClientStatusContainer
class Main extends React.Component {
  componentWillMount() {
    const { changeOnlineStatus } = this.props;
    window.addEventListener('offline', changeOnlineStatus(false), false);
    window.addEventListener('online', changeOnlineStatus(true), false);
  }

  componentWillUnmount() {
    const { changeOnlineStatus } = this.props;
    window.removeEventListener('offline', changeOnlineStatus);
    window.removeEventListener('online', changeOnlineStatus);
  }

  render() {
    const { isOnline } = this.props;
    const currentkey = location.pathname.split('/')[1] || ''; // 追加
    return (
      <div className={classes.root}>
        {!isOnline && (
          <TopMessageBar>Currently Offline. Please check your network condition.</TopMessageBar>
        )}
        <SidebarLeft className={classes.sidebarLeft} />
        <div className={classes.main}>
          <TransitionGroup>
            <CSSTransition
              key={currentkey}
              classNames="fadeTranslate"
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

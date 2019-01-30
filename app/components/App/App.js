import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import universal from 'react-universal-component';
import SidebarLeft from '@components/Sidebars/SidebarLeft';
import { hot } from 'react-hot-loader';
import classes from './App.scss';

const Main = universal(import(/* webpackChunkName: "Main" */ '../Main'));
const Auth = universal(import(/* webpackChunkName: "Auth" */ '../Auth'));

class App extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);

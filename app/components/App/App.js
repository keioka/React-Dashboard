import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import universal from 'react-universal-component';
import { hot } from 'react-hot-loader';
import SidebarLeft from '@components/Sidebars/SidebarLeft';
import classes from './App.scss';

const Main = universal(import(/* webpackChunkName: "Main" */ '../Main'));
const Auth = universal(import(/* webpackChunkName: "Auth" */ '../Auth'));

class App extends React.Component {
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

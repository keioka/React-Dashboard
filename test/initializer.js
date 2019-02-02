import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  configure, shallow, render, mount,
} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const initialState = {
  clientStatus: {
    isOnline: true,
  },
};

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore(initialState);

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.store = store;
global.Provider = Provider;
global.ConnectedRouter = ConnectedRouter;
global.createHistory = createHistory;

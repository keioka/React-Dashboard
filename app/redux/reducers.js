import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import auth from '@redux/auth';
import post from '@redux/post';

import clientStatus from '@redux/clientStatus';

const rootReducer = combineReducers({
  auth,
  post,
  clientStatus,
  routing,
});

export default rootReducer;

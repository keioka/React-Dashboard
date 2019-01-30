import { actions as authActions } from './auth/index';
import { actions as postActions } from './post/index';

import { actions as clientStatusActions } from './clientStatus/index';

export default { ...authActions, ...postActions, ...clientStatusActions };

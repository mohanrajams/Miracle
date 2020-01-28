import { combineReducers } from 'redux';
import login from './login';
import header from './header';
import myteam from './myteam';
import homeShell from './homeShell';

const reducer = combineReducers({ login, header, myteam, homeShell });

export default reducer;
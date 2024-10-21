import { combineReducers } from 'redux';
import login from './login';
import header from './header';
import myteam from './myteam';
import homeShell from './homeShell';
import app from './app';
import changepassword from './changepassword';

const reducer = combineReducers({ login, header, myteam, homeShell, app, changepassword });

export default reducer;
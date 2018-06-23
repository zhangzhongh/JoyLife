import { combineReducers } from 'redux';
import main from './main';
import room from './room';
import maintain from './maintain';
import SceneOfRoom from './SceneOfRoom';
import MusicOfRoom from './MusicOfRoom';
import musicstore from './musicstore';
import commendscene from './commendscene';
import clientloginstatistical from './clientloginstatistical';
import musicstatistical from './musicstatistical';
import panel from './panel';
import musiccheck from './musiccheck';
import maker from './maker';

const rootReducer = combineReducers({
  main,
  room,
  maintain,
  SceneOfRoom,
  MusicOfRoom,
  musicstore,
  commendscene,
  clientloginstatistical,
  musicstatistical,
  panel,
  musiccheck,
  maker
});

export default rootReducer

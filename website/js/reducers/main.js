'use strict';

import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
  fetching: false,
  fetched: false,
  menu_nav: [],
  menu_nav_index: 0,
  menu_modules_current: [],
  module_current_index: 0,
}

export default function main(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

  switch (action.type) {
    case ActionTypes.FETCH_MENU_RESULT:
      return Object.assign({}, state, {
          fetching: true,
          fetched: false
      });
    case ActionTypes.RECEIVE_MENU_RESULT:
      return Object.assign({}, state, {
        fetched: true,
        menu_nav: action.rawData,
        menu_nav_index:0,
        module_current_index:0,
        menu_modules_current:action.rawData[0],
      });
    case ActionTypes.CHANGE_NAV_MENU:
      return Object.assign({}, state, {
        menu_nav_index: action.index,
        menu_modules_current:state.menu_nav[action.index],
        module_current_index:0,
      });
    case ActionTypes.CHANGE_MODULE:
      return Object.assign({}, state, {
        module_current_index: action.index
      });
    default:
      return state;
  }
}

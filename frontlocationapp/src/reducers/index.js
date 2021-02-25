import testReducer from './test'

import {combineReducers} from 'redux'

const allReducers = combineReducers({
  test: testReducer
})


export default allReducers;

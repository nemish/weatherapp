import { combineReducers } from 'redux';
import {
    createFetchReducer,
    createFetchReducerCallbacks,
    createReducer,
    createModalReducer
} from '../utils/reducers';
import {
  fetchCitiesActions,
  RESET_ITEMS,
  SET_CITY
} from '../actions/cities';
import {
  fetchForecastActions
} from '../actions/app';



const cities = createFetchReducer({
  event: fetchCitiesActions,
  dataProcessor: data => data.items,
  callbacks: {
    [RESET_ITEMS](state, action) {
      return {...state, data: []}
    }
  }
});

const forecast = createFetchReducer({
  event: fetchForecastActions
});


const app = createReducer({city: {}}, {
  [SET_CITY](state, action) {
    return {...state, city: action.data}
  }
})


export default combineReducers({
    cities,
    app,
    forecast
});
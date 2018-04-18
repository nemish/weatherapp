import { combineReducers } from 'redux';
import {
    createFetchReducer,
    createReducer
} from '../utils/reducers';
import {
  fetchCitiesActions,
  RESET_ITEMS,
  SET_CITY
} from '../actions/cities';
import {
  fetchForecastActions,
  TOGGLE_SCALE
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
  event: fetchForecastActions,
  failDataProcessor(data) {
    return {};
  }
});


const app = createReducer({city: {}, scale: 'F'}, {
  [SET_CITY](state, action) {
    return {...state, city: action.data};
  },
  [TOGGLE_SCALE](state, action) {
    return {...state, scale: state.scale === 'F' ? 'C' : 'F'};
  }
})


export default combineReducers({
    cities,
    app,
    forecast
});
import { createAsyncActionsConf, createAsyncAction, makeActionCreator } from '../utils/actions';

export const FETCH_CITIES = 'FETCH_CITIES';
export const RESET_ITEMS = 'RESET_ITEMS';
export const SET_CITY = 'SET_CITY';

export const resetItems = makeActionCreator(RESET_ITEMS);
export const setCity = makeActionCreator(SET_CITY, 'data');

export const fetchCitiesActions = createAsyncActionsConf(FETCH_CITIES);
export const fetchCities = createAsyncAction({
    url: payload => '/cities/',
    ...fetchCitiesActions
});

export const fetchCitiesByLocation = () => {
  return function(dispatch) {
    dispatch(fetchCities.startActionCreator());
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        return res(dispatch(fetchCities({ latitude, longitude })));
      }, () => {
        return rej(dispatch(fetchCities.failActionCreator()));
      }, {
        timeout: 5000
      });
    })
  }
}
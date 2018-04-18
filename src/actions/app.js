import { createAsyncActionsConf, createAsyncAction, makeActionCreator } from '../utils/actions';

export const FETCH_FORECAST = 'FETCH_FORECAST';
export const TOGGLE_SCALE = 'TOGGLE_SCALE';

export const fetchForecastActions = createAsyncActionsConf(FETCH_FORECAST);
export const fetchForecast = createAsyncAction({
    url: payload => '/forecast/',
    ...fetchForecastActions
});

export const toggleScale = makeActionCreator(TOGGLE_SCALE);
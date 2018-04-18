import { createAsyncActionsConf, createAsyncAction, makeActionCreator } from '../utils/actions';

export const FETCH_FORECAST = 'FETCH_FORECAST';

export const fetchForecastActions = createAsyncActionsConf(FETCH_FORECAST);
export const fetchForecast = createAsyncAction({
    url: payload => '/forecast/',
    ...fetchForecastActions
});

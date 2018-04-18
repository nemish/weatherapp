import { createAsyncActionsConf, createAsyncAction, makeActionCreator } from '../utils/actions';
import './cities';


export const LOGIN_FORM = 'LOGIN_FORM';


export const FORMS_NAMES = [LOGIN_FORM];


export const formsActions = FORMS_NAMES.reduce((aggregator, name) => {
    const changeActionName = name + '__CHANGE_VALUE';
    aggregator[name] = {
        changeActionName,
        key: name.toLowerCase(),
        changeValue: makeActionCreator(changeActionName, 'data')
    }
    return aggregator;
}, {});
import { createAsyncActionsConf } from './actions';


export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


export const createModalReducer = modalActions => {
    return createReducer({
        showWindow: false,
        modalData: {}
    }, {
        [modalActions.actions.open](state, action) {
            return {...state, showWindow: true, modalData: action.modalData}
        },
        [modalActions.actions.close](state, action) {
            return {...state, showWindow: false, modalData: {}}
        }
    })
}


export const createFetchReducerCallbacks = (event, initialData, dataProcessor, failDataProcessor) => {
    let conf = event;
    if (typeof event === 'string') {
        conf = createAsyncActionsConf(event);
    }
    return {
        [conf.startEvent](state, action) {
            return {...state, loading: true};
        },
        [conf.successEvent](state, action) {
            let data = action.data;
            if (dataProcessor) {
                data = dataProcessor(data);
            }
            return {...state, loading: false, data};
        },
        [conf.failEvent](state, action) {
            const newState =  {...state, loading: false};
            if (failDataProcessor) {
                newState.data = failDataProcessor(action.data);
            }
            return newState;
        }
    }
}


export const createFetchReducer = ({event, initialData = [], callbacks = {}, dataProcessor = null, failDataProcessor = null}) => {
    return createReducer({loading: false, data: initialData}, {
        ...createFetchReducerCallbacks(event, initialData, dataProcessor, failDataProcessor),
        ...callbacks
    });
}


export const createFormReducer = (conf) => {

    const defaultFormState = {
        _dataState: {
            formReady: true
        }
    };

    return (state = defaultFormState, action) => {
        if (conf.customActions && conf.customActions[action.type]) {
            return conf.customActions[action.type](state, action);
        }

        switch (action.type) {
            case conf.initEvent:
                let extraData = {};
                if (conf.getExtraData) {
                    extraData = conf.getExtraData(action.item);
                }
                return {
                    ...state,
                    ...action.item,
                    ...extraData,
                    _dataState: {
                        ...state._dataState,
                        formReady: true,
                        itemId: action.item ? action.item.id : null
                    }
                }

            case conf.saveSuccessEvent:
            case conf.formDestroyEvent:
                return defaultFormState;

            case conf.changeFieldEvent:
                return {...state, [action.data.name]: action.data.value}
            case conf.saveStartEvent:
                return {...state, _dataState: {
                    ...state._dataState, isSubmitting: true
                }}
            case conf.saveFailEvent:
                return {...state, _dataState: {
                    ...state._dataState, isSubmitting: false
                }}
            default:
                return state
        }
    }
}
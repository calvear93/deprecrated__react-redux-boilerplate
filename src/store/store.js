import { createStore } from 'modules/store';
import { SampleHandler, SampleReducer, SampleSaga } from './sample';

const debug = process.env.REACT_APP_DEBUG === 'true';

const actions = [
    SampleHandler
];

const reducers ={
    [SampleHandler.Key]: SampleReducer
};

const sagas = [
    SampleSaga()
];

export default createStore({ reducers, sagas, actions, debug });

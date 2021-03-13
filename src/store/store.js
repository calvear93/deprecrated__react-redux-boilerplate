import { createStore } from '@calvear/react-redux';
import { SamplePartition, SampleReducer, SampleSaga } from './sample';

const debug = process.env.REACT_APP_DEBUG === 'true';

const reducers ={
    [SamplePartition.Key]: SampleReducer
};

const sagas = [
    SampleSaga()
];

export default createStore({ reducers, sagas, debug });

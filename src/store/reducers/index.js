import { combineReducers } from 'redux';
import { SampleAction, AzureActiveDirectoryAction } from '../actions';
import SampleReducer from './sample';
import AzureActiveDirectoryReducer from './aad';

// combine all reducers for store initialization.
export default combineReducers({
    [SampleAction.Key]: SampleReducer,
    [AzureActiveDirectoryAction.Key]: AzureActiveDirectoryReducer
});

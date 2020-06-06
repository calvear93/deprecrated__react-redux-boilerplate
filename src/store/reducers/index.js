import { combineReducers } from 'redux';
import { SampleAction, AzureActiveDirectoryAction } from '../actions';
import SampleReducer from './sample.reducer';
import AzureActiveDirectoryReducer from './aad.reducer';

// combine all reducers for store initialization.
export default combineReducers({
    [SampleAction.Key]: SampleReducer,
    [AzureActiveDirectoryAction.Key]: AzureActiveDirectoryReducer
});

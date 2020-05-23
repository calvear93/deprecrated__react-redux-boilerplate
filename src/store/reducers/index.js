import { combineReducers } from 'redux';
import { MasterDataAction, TransactionAction } from '../actions';
import MasterDataReducer from './master-data';
import TransactionReducer from './transaction';

// combine all reducers for store initialization.
export default combineReducers({
    [MasterDataAction.Key]: MasterDataReducer,
    [TransactionAction.Key]: TransactionReducer
});

import query from 'query-string';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MasterDataAction } from '../store/actions';

/**
 * Returns URL query parameters.
 * Depends of React Router
 * useLocation() effect.
 *
 * @export
 * @returns {any} query params.
 */
export function useQueryParams()
{
    const { search } = useLocation();

    return query.parse(search);
}

/**
 * Allows to query a store partition by an action vault.
 * Depends of Redux useSelector() effect.
 *
 * @export
 * @param {any} actionVault action vault.
 * @returns {any} partition.
 */
export function usePartition(actionVault)
{
    return useSelector(
        ({ [actionVault.Key]: partition }) => partition,
        shallowEqual
    );
}

/**
 * Normalizes transaction data from
 * master data dictionaries.
 *
 * @export
 * @param {any} transaction transaction info.
 * @returns {any} transaction.
 */
export function useNormalizeTransaction(transaction)
{
    const { data: {
        AuthenticationResultCode,
        TransactionResultCode,
        TransactionState,
        TransactionType
    } = {} } = usePartition(MasterDataAction);

    if (!transaction)
        return undefined;

    // attributes translation.
    translate(transaction, AuthenticationResultCode, 'AuthorizationCode');
    translate(transaction, TransactionResultCode, 'ResultCode');
    translate(transaction, TransactionState, 'State');
    translate(transaction, TransactionType, 'Type');

    return transaction;
}

/**
 * Translates a attribute with a dictionary.
 *
 * @param {any} obj object with attribute for translate.
 * @param {any} dictionary dictionary.
 * @param {string} attr attribute for translate.
 */
function translate(obj, dictionary, attr)
{
    obj[attr] = dictionary ? dictionary[obj[attr]]?.Descriptor : obj[attr];
}

import { shallowEqual, useSelector } from 'react-redux';

/**
 * Allows to query a store partition by an action vault.
 * Depends of Redux useSelector() effect.
 *
 * @export
 * @param {any} actionVault action vault (from store/actions).
 * @param {any} equalityFunc the function that will be used to determine equality.
 * @returns {any} partition.
 */
export function usePartition(actionVault, equalityFunc = shallowEqual)
{
    return useSelector(
        ({ [actionVault.Key]: partition }) => partition,
        equalityFunc
    );
}

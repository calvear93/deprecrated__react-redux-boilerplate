import { shallowEqual, useSelector } from 'react-redux';

/**
 * Allows to query a store partition by an action vault.
 * Depends of Redux useSelector() effect.
 *
 * @export
 * @param {any} actionVault action vault (from store/actions).
 * @returns {any} partition.
 */
export function usePartition(actionVault)
{
    return useSelector(
        ({ [actionVault.Key]: partition }) => partition,
        shallowEqual
    );
}

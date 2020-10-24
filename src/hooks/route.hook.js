import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Returns URL query parameters.
 *
 * @example
 *  const { get } = useQueryParams();
 *  const name = get('name');
 *
 * @dependency useLocation from react-router-dom.
 *
 * @returns {URLSearchParams} URL params handler.
 */
export function useQueryParams()
{
    const { search } = useLocation();

    return new URLSearchParams(search);
}

/**
 * Returns URL hash value.
 *
 * @example
 *  const hash = useHash();
 *
 * @dependency useLocation from react-router-dom.
 *
 * @returns {string} URL hash.
 */
export function useHash()
{
    const { hash } = useLocation();

    return hash.slice(1);
}

/**
 * Retrieves current path state.
 *
 * @dependency useLocation from react-router-dom.
 *
 * @returns {any} route state.
 */
export function useRouteState()
{
    const { state } = useLocation();

    return state;
}

/**
 * Whether current path belongs
 * to provided list, like whitelist.
 *
 * @dependency useLocation from react-router-dom.
 * @param {Array} list array of paths (strings)
 *
 * @returns {boolean} true if current path is in.
 */
export function usePathBelongsTo(list)
{
    // validates current path for list.
    const { pathname } = useLocation();
    // paths in uppercase.
    const comparingList = useMemo(() => list.map((p) => p.toUpperCase()), [ list ]);

    return comparingList.includes(pathname.toUpperCase());
}

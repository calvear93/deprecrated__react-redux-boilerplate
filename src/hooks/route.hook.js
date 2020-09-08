import { useMemo } from 'react';
import query from 'query-string';
import { useLocation } from 'react-router-dom';

/**
 * Returns URL query parameters.
 *
 * @dependency useLocation from react-router-dom.
 *
 * @returns {any} query params.
 */
export function useQueryParams()
{
    const { search } = useLocation();

    return query.parse(search);
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
    const comparingList = useMemo(() => list.map(p => p.toUpperCase()), [ list ]);

    return comparingList.includes(pathname.toUpperCase());
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
    return useLocation()?.state;
}

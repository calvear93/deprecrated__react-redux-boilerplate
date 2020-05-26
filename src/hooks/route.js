import { useMemo } from 'react';
import query from 'query-string';
import { useLocation } from 'react-router-dom';

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
 * Whether current path belongs
 * to provided list, like whitelist.
 * Depends of React Router
 * useLocation() effect.
 *
 * @export
 * @param {array} list array of paths (strings)
 * @returns {bool} true if current path is in.
 */
export function usePathBelongsTo(list)
{
    // validates current path for list.
    const { pathname } = useLocation();
    // paths in uppercase.
    const comparingList = useMemo(() => list.map(p => p.toUpperCase()), [ list ]);

    return comparingList.includes(pathname.toUpperCase());
}

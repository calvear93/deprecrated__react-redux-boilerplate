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

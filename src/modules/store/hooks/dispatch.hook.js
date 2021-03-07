import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useActionDispatch(type)
{
    const dispatch = useDispatch();
    const [ action, setAction ] = useState(() => (payload) => dispatch({ type, payload }));

    useEffect(() =>
    {
        setAction(() => (payload) => dispatch({ type, payload }));
    }, [ type, dispatch ]);

    return action;
}

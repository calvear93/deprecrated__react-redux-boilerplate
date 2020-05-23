import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import '../styles/components/loader.scss';
import color from '../styles/vars/_colors.scss';

/**
 * Loader component for React Suspense and lazy.
 * Renders the loading component.
 *
 * @param {string} message message for show in loading.
 * @param {JSX} children component for show on no loading.
 * @param {bool} loading whether loading is active.
 *
 * @returns {JSX} loader.
 */
export default function Loader({ message, children, loading = true })
{
    return loading ? (
        <div className='loader-container unselectable'>
            <div className='loader'>
                <BounceLoader
                    color={ color.brand }
                />
                {message && <label>{message}</label>}
            </div>
        </div>
    ) : children ? (
        children
    ) : (null);
}

import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import '../styles/components/loader.scss';
import color from '../styles/vars/_colors.scss';

/**
 * Loader component for React Suspense and lazy.
 * Renders the loading component.
 *
 * @param {JSX} children component for show on loading finished.
 * @param {string} message message for show on loading.
 * @param {bool} absolute whether loading has fixed centered position.
 * @param {bool} blur whether loading backdrop has a blur filter (slow).
 * @param {bool} loading whether loading is active.
 *
 * @returns {JSX} loader.
 */
export default function Loader({ children, message, absolute = true, blur = false, loading = true })
{
    // container classes.
    const classes = [ 'loader-container', 'unselectable' ];

    absolute && classes.push('absolute');
    blur && classes.push('blur');

    if (!loading)
        return children ?? null;

    return (
        <div className={ classes.join(' ') }>
            <div className='loader'>
                <BounceLoader
                    color={ color.brand }
                />
                {message && <label>{message}</label>}
            </div>
        </div>
    );
}

import clsx from 'clsx';
import BounceLoader from 'react-spinners/BounceLoader';
import './loader.scss';

/**
 * Loader component for React Suspense and lazy.
 * Renders the loading component.
 *
 * @param {object} props component props.
 * @param {React.ReactElement} [props.children] component for show on loading finished.
 * @param {string} [props.message] message for show on loading.
 * @param {boolean} [props.absolute] whether loading has fixed centered position.
 * @param {boolean} [props.background] whether loading has a transparent background.
 * @param {boolean} [props.blur] whether loading backdrop has a blur filter (slow).
 * @param {boolean} [props.loading] whether loading is active.
 *
 * @returns {React.ReactElement} loader.
 */
export default function Loader({
    children,
    message,
    absolute = true,
    background = false,
    blur = false,
    loading = true
})
{
    if (!loading)
        return children ?? null;

    return (
        <div className={ clsx('loader-container', 'unselectable', { absolute, background, blur }) }>
            <div className='loader'>
                <BounceLoader color='#007a33' />
                {message && <label>{message}</label>}
            </div>
        </div>
    );
}

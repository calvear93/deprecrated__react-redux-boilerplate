import './base-layout.scss';

/**
 * Base layout (wrapper for pages without header/footer).
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children component for render inside.
 *
 * @returns {React.ReactElement} base layout.
 */
export default function BaseLayout({ children })
{
    return (
        <main id='base-layout'>
            {children}
        </main>
    );
}

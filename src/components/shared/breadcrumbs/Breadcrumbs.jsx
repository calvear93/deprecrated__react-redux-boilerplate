import DynamicBreadcrumbs from 'react-router-dynamic-breadcrumbs';
import { RouterService } from 'modules/router';

// routes array.
const paths = Object.keys(RouterService.Breadcrumbs);

/**
 * Dynamic breadcrumbs for
 * React Router v4+.
 *
 * @returns {React.ReactElement} breadcrumbs.
 */
export default function Breadcrumbs()
{
    return (
        <DynamicBreadcrumbs
            mappedRoutes={ RouterService.Breadcrumbs }
            WrapperComponent={ ({ children }) => (
                <div className='ui breadcrumb'>{children}</div>
            ) }
            ActiveLinkComponent={ ({ children }) => (
                <div className='active section'>{children}</div>
            ) }
            LinkComponent={ ({ children }) =>
            {
                // route isn't defined.
                if (!paths.includes(children.props.to))
                    return null;

                return (
                    <>
                        <div className='section'>{children}</div>
                        <i aria-hidden='true' className='right angle icon divider' />
                    </>
                );
            } }
        />
    );
}

import { useRoutePayload } from '@calvear/react-spa-routerizer';

/**
 * Header for App Layout.
 *
 * @returns {React.ReactElement} header component.
 */
export default function Header()
{
    const { header: { title } = {} } = useRoutePayload();

    return (
        <header>
            {title}
        </header>
    );
}

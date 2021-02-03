import { useRoutePayload } from '@calvear/react-spa-routerizer';

/**
 * Footer for App Layout.
 *
 * @returns {React.ReactElement} footer component.
 */
export default function Footer()
{
    const { footer: { text } = {} } = useRoutePayload();

    return (
        <footer>
            {text}
        </footer>
    );
}

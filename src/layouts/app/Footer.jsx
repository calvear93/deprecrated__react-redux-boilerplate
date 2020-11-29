import { useRoutePayload } from 'modules/router';

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

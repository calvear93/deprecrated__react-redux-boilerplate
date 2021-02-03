import { useParams } from '@calvear/react-spa-routerizer';

/**
 * Query Demo page.
 *
 * @returns {React.ReactElement} Query Demo page.
 */
export default function QueryDemoPage()
{
    const { id } = useParams();

    return (
        <page is='div' id='query-demo-page'>
            QUERY: {id}
        </page>
    );
}

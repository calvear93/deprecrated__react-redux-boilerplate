import { useEffect } from 'react';

/**
 * Renders the page or router in routing mapping.
 *
 * @param {any} props component props.
 * @param {object} props.render child config.
 * @param {string} props.render.title page document title.
 * @param {React.ReactElement | object} [props.render.Layout] layout render and props.
 * @param {React.ReactElement | object} props.render.Child page/router render and props.
 *
 * @returns {React.ReactElement} route child.
 */
export default function RouteChild({ render })
{
    const { title, Layout, Child } = render;

    // sets up tab title.
    useEffect(() =>
    {
        document.title = title;
    }, [ title ]);

    return Layout ? (
        <Layout>
            <Child />
        </Layout>
    ) : (
        <Child />
    );
}

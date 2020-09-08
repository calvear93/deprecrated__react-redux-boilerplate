import React from 'react';
import { useDocumentTitle } from 'hooks/document.hook';

/**
 * Renders the page or router in routing mapping.
 *
 * @param {any} props component props.
 * @param {object} props.render child config.
 * @param {string} props.render.title page document title.
 * @param {object} [props.render.layoutConfig] layout config.
 * @param {React.ReactElement} [props.render.Layout] layout component.
 * @param {React.ReactElement} props.render.Child child component, maybe a Page or Router.
 * @param {any} [props.render.props] child props.
 *
 * @returns {React.ReactElement} route child.
 */
export default function RouteChild({ render })
{
    const {
        title,
        layoutConfig,
        Layout,
        Child,
        ...props
    } = render;

    // sets up tab title.
    useDocumentTitle(title);

    return Layout ? (
        <Layout { ...layoutConfig }>
            <Child { ...props } />
        </Layout>
    ) : (
        <Child { ...props } />
    );
}

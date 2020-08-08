import React from 'react';
import { useDocumentTitle } from '../hooks/document.hook';

/**
 * Renders the page or router in routing mapping.
 *
 * @param {object} render child config.
 * @param {string} render.title page document title.
 * @param {any} render.layoutConfig layout config.
 * @param {React.ReactElement} render.Layout layout component.
 * @param {React.ReactElement} render.Child child component, maybe a Page or Router.
 * @param {object} render.props child props.
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

    // sets up page tab title.
    useDocumentTitle(title);

    return Layout ? (
        <Layout { ...layoutConfig }>
            <Child { ...props } />
        </Layout>
    ) : (
        <Child { ...props } />
    );
}

import { useDocumentTitle } from 'hooks/document.hook';

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

    const [ LayoutRender, layoutProps ] = ExtractRender(Layout);
    const [ ChildRender, childProps ] = ExtractRender(Child);

    // sets up tab title.
    useDocumentTitle(title);

    return LayoutRender ? (
        <LayoutRender { ...layoutProps }>
            <ChildRender { ...childProps } />
        </LayoutRender>
    ) : (
        <ChildRender { ...childProps } />
    );
}

/**
 * Extracts renderer and props.
 *
 * @param {React.ReactElement | object} renderer component renderer.
 * @param {object} [renderer.Render] component.
 * @param {...any} [renderer.props] props.
 *
 * @returns {Array} render and props.
 */
function ExtractRender(renderer)
{
    if (!renderer)
        return [];

    if (!renderer?.Render)
        return [ renderer ];

    const { Render, ...props } = renderer;

    return [ Render, props ];
}

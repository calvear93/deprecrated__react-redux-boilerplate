import React from 'react';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import './tippy.scss';

/**
 * Wrapper for Tippy tooltip.
 *
 * @see https://atomiks.github.io/tippyjs
 * @see https://github.com/atomiks/tippyjs-react
 *
 * example:
 *  <Tooltip
 *      content='hello world'
 *      textType={ [ 'bold', 'underline' ] }
 *  >
 *      <button>Press Me</button>
 *  </Tooltip>
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children children component.
 * @param {string | array} props.className classes.
 * @param {string | array} props.textType text type.
 * @param {object} props.props rest of props for Tippy.
 *
 * @returns {React.ReactElement} component with Tippy tooltip.
 */
export default function Tooltip({ children, className, textType, ...props })
{
    return (
        <Tippy
            arrow
            touch
            inertia
            placement='auto'
            theme='light-border'
            animation='scale-extreme'
            interactive
            interactiveBorder={ 1 }
            hideOnClick={ false }
            delay={ [ 80, 40 ] }
            className={ clsx(
                'tooltip-container',
                className,
                textType
            ) }
            { ...props }
        >
            {children}
        </Tippy>
    );
}

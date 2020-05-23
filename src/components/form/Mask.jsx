/* eslint-disable react/no-find-dom-node */
import IMask from 'imask';
import React from 'react';
import { IMaskMixin } from 'react-imask';
import { Ref } from 'semantic-ui-react';

/**
 * Attaches a mask (using imask) to an input.
 *
 * @param {any} props component props.
 *
 * @returns {JSX} masked input.
 */
function Mask({ mask, children, onAccept, ...props })
{
    /**
     * Maps onAccept result for onChange behaviour.
     *
     * @param {string} value current value.
     * @param {any} masker mask controller.
     */
    function handleAccept(value, masker)
    {
        if (value !== props.value)
            onAccept && onAccept(masker, { id: masker.el.input.id, value });
    }

    return (
        <MaskedInput mask={ IMask.createMask(mask) } onAccept={ handleAccept } { ...props }>
            {children}
        </MaskedInput>
    );
}

/**
 * Searches for input inside the DOM node.
 *
 * @param {any} node parent node.
 * @returns {any} input node.
 */
function findInput(node)
{
    return node?.querySelectorAll('input')[0];
}

/**
 * Masks element.
 *
 * @param {any} node parent node.
 * @returns {any} input node.
 */
const MaskedInput = IMaskMixin(({ inputRef, children, ...props }) =>
{
    return (
        <Ref innerRef={ (node) => inputRef(findInput(node)) }>
            {React.cloneElement(children, { ...props })}
        </Ref>
    );
});

export default Mask;

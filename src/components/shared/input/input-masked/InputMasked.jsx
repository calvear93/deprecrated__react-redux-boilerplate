import IMask from 'imask';
import React from 'react';
import { IMaskInput } from 'react-imask';

/**
 * Wrapper for IMaskInput
 *
 * @example
 *  <InputMasked
 *      mask={ PhoneMask }
 *      radix="."
 *      value="123"
 *      unmask={ true } // true|false|'typed'
 *      inputRef={ el => this.input = el }  // access to nested input
 *      // DO NOT USE onChange TO HANDLE CHANGES!
 *      // USE onAccept INSTEAD
 *      onAccept={
 *          // depending on prop above first argument is
 *          // `value` if `unmask=false`,
 *          // `unmaskedValue` if `unmask=true`,
 *          // `typedValue` if `unmask='typed'`
 *          (value, mask) => console.log(value)
 *      }
 *      // ...and more mask props in a guide
 *
 *      // input props also available
 *      placeholder='Enter phone number here'
 *  />
 *
 * @see https://www.npmjs.com/package/react-imask
 *
 * @param {object} props component props.
 * @param {any} props.mask mask.
 * @param {object} [props.props] input props.
 *
 * @returns {React.ReactElement} masked input.
 */
export default function InputMasked({ mask, ...props })
{
    return (
        <div className='ui input'>
            <IMaskInput mask={ IMask.createMask(mask) } { ...props } />
        </div>
    );
}

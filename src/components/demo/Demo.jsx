import React, { useEffect } from 'react';
import { Container, Header, Input } from 'semantic-ui-react';
import { BallTriangleLoader } from '../../assets/loaders';
import Tippy from '../../utils/libs/tippy';
import Toast from '../../utils/libs/toast';
import { CheckBox, RadioGroup, InputMasked, Mask, TextArea, TimePicker } from '../input';
import { PhoneAdvancedMask, RutMask } from '../../utils/masks';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo()
{
    useEffect(() =>
    {
        Toast.show(<b>Welcome to demo view</b>, 6000, Toast.TYPE.SUCCESS);
        Tippy();
    }, []);

    return (
        <Container fluid text textAlign='justified'>
            <Header as='h2'>Demo</Header>
            <BallTriangleLoader style={ { stroke: 'green' } } data-tooltip='This is a SVG loader' data-tooltip-classes='medium bold' />

            <Header as='h4'>Checkbox</Header>
            <CheckBox
                group='check-demo'
                clearable
                onChange={ (e, value) => console.log(value) }
                options={ [
                    {
                        value: 0,
                        label: 'False'
                    },
                    {
                        value: 1,
                        label: 'True'
                    },
                    {
                        value: 'Any Value',
                        label: 'Any Value'
                    }
                ] }
            />

            <Header as='h4'>Radio Group</Header>
            <RadioGroup
                group='radio-demo'
                clearable
                onChange={ (e, value) => console.log(value) }
                options={ [
                    {
                        value: 0,
                        label: 'False'
                    },
                    {
                        value: 1,
                        label: 'True'
                    },
                    {
                        value: 'Any Value',
                        label: 'Any Value'
                    }
                ] }
            />

            <Header as='h4'>Input Masked</Header>
            <InputMasked mask={ PhoneAdvancedMask } />

            <Header as='h4'>Input Mask Wrapper</Header>
            <Mask mask={ RutMask } onAccept={ (e, values) => console.log(values) }>
                <Input id='simple-input' placeholder='Simple Input Masked' />
            </Mask>

            <Header as='h4'>Text Area</Header>
            <TextArea placeholder='a simple textarea' />

            <Header as='h4'>Time Picker</Header>
            <TimePicker showClearButton />
        </Container>
    );
}

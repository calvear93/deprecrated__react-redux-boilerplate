import React, { useEffect } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { BallTriangleLoader } from '../../assets/loaders';
import Tippy from '../../utils/libs/tippy';
import Toast from '../../utils/libs/toast';
import { CheckBox, RadioGroup, InputMasked, Mask, TextArea, TimePicker } from '../input';
import { PhoneAdvancedMask, RutMask } from '../../utils/masks';
import { Row } from 'react-flexbox-grid';
import { useFormik } from 'formik';
import Swal from '../../utils/libs/swal';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo()
{
    const formik = useFormik({
        initialValues: {},
        onSubmit: values =>
        {
            Swal.confirm('success', JSON.stringify(values, null, 2));
        }
    });

    useEffect(() =>
    {
        Toast.show(<b>Welcome to demo view</b>, 6000, Toast.TYPE.SUCCESS);
        Tippy();
    }, []);

    return (
        <Container fluid text textAlign='justified'>
            <Header as='h2'>Demo</Header>
            <BallTriangleLoader style={ { stroke: 'green' } } data-tooltip='This is a SVG loader' data-tooltip-classes='medium bold' />
            <form onSubmit={ formik.handleSubmit }>
                <Header as='h4'>Checkbox</Header>
                <CheckBox
                    group='check-demo'
                    clearable
                    onChange={ formik.handleChange }
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
                    onChange={ formik.handleChange }
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

                <Header as='h4'>Text Area</Header>
                <TextArea id='text-area-demo' placeholder='a simple textarea' onChange={ formik.handleChange } />

                <Header as='h4'>Input Masked</Header>
                <InputMasked mask={ PhoneAdvancedMask } />

                <Header as='h4'>Input Mask Wrapper</Header>
                <Mask mask={ RutMask } onAccept={ (e, values) => console.log(values) }>
                    <Input id='simple-input' placeholder='Simple Input Masked' />
                </Mask>

                <Header as='h4'>Time Picker</Header>
                <TimePicker
                    id='time-sample'
                    time='14:17'
                    clearable
                    onChange={ (nwTime, values) => console.log(nwTime, values) }
                />

                <Row>
                    <Button type='submit' color='teal'>Submit</Button>
                </Row>
            </form>

        </Container>
    );
}

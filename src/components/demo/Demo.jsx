import React, { useEffect } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { BallTriangleLoader } from '../../assets/loaders';
import Tippy from '../../utils/libs/tippy';
import Toast from '../../utils/libs/toast';
import { CheckBox, RadioGroup, InputMasked, Mask, TextArea, TimePicker } from '../input';
import { PhoneAdvancedMask, RutMask } from '../../utils/masks';
import { Row, Col } from 'react-flexbox-grid';
import { useFormik } from 'formik';
import Swal from '../../utils/libs/swal';
import { useDispatch } from 'react-redux';
import { AzureActiveDirectoryAction } from '../../store/actions';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo()
{
    const dispatch = useDispatch();

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

    function logout()
    {
        // dispatch(AzureActiveDirectoryAction.Action(AzureActiveDirectoryAction.Type.LOGOUT));
    }

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
                <InputMasked id='masked' mask={ PhoneAdvancedMask } onAccept={ (value, masker) => formik.setFieldValue(masker.el.input.id, value) } />

                <Header as='h4'>Input Mask Wrapper</Header>
                <Mask mask={ RutMask } onAccept={ formik.handleChange }>
                    <Input id='simple-input' placeholder='Simple Input Masked' />
                </Mask>

                <Header as='h4'>Time Picker</Header>
                <TimePicker
                    id='time-sample'
                    time='14:17'
                    clearable
                    onChange={ formik.handleChange }
                />

                <Row>
                    <Button
                        type='submit'
                        color='teal'
                        content= { (
                            <div className='mdi-anim-flash mdi-anim-slow animated'>
                                <i className='mdi mdi-check-circle' />
                                <span>Submit</span>
                            </div>
                        ) }
                    />
                </Row>
            </form>

            {/* <Row>
                <Col>
                    <Button
                        color='red'
                        content='Logout'
                        onClick={ logout }
                    />
                </Col>
            </Row> */}
        </Container>
    );
}

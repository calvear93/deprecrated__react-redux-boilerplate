import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Statistic } from 'semantic-ui-react';
import '../../styles/pages/not-found-page.scss';

/**
 * Renders the 404 not found info page.
 *
 * @returns {JSX} Not Found page.
 */
export default function NotFoundPage()
{
    return (
        <Grid>
            <Grid.Row className='container' centered>
                <Statistic>
                    <Statistic.Value className='notfound-404'>404</Statistic.Value>
                    <Statistic.Label>La página que estás buscando no existe... o la raptaron los alienígenas o.0</Statistic.Label>
                </Statistic>
            </Grid.Row>

            <Grid.Row centered>
                <Link to='/'>
                    <Button
                        color='teal'
                        icon={ { className: 'mdi mdi-keyboard-return' } }
                        content='Return to Homepage'
                    />
                </Link>
            </Grid.Row>
        </Grid>
    );
}

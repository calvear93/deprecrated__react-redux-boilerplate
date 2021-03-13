import './playground-page.scss';
import { useEffect } from 'react';
import { useAsync } from 'react-use';
import WebClient from 'services/api/web-client';
import { List } from 'semantic-ui-react';
import { SamplePartition } from 'store/sample';
import { useActionDispatch, usePartition } from '@calvear/react-redux/hooks';

/**
 * Playground page.
 *
 * @returns {React.ReactElement} Playground page.
 */
export default function PlaygroundPage()
{
    const { loading, value: { data } = {} } = useAsync(WebClient.Users.GetAll, []);
    const dispatchExec = useActionDispatch(SamplePartition.Type.EXEC);
    const sampleState = usePartition(SamplePartition);

    // eslint-disable-next-line no-console
    console.log(sampleState);

    useEffect(() =>
    {
        dispatchExec({ data: 'hello world' });
    }, []);

    return (
        <page is='div' id='playground-page'>
            <List divided relaxed>
                {loading ? (
                    <List.Item>
                        <b>Cargando...</b>
                    </List.Item>
                ) : data?.users.map((user, index) => (
                    <List.Item key={ user.id } index={ index }>
                        {user.name}
                        <br />
                        {user.job}
                    </List.Item>
                ))}
            </List>
        </page>
    );
}

import React from 'react';
import './playground-page.scss';
import { useAsync } from 'react-use';
import WebClient from 'services/api/web-client';
import { List } from 'semantic-ui-react';

/**
 * Playground page.
 *
 * @returns {React.ReactElement} Playground page.
 */
export default function PlaygroundPage()
{
    const { loading, value: { data } = {} } = useAsync(WebClient.Users.GetAll, []);

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

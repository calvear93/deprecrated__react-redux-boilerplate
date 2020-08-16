import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Query Demo page.
 *
 * @returns {React.ReactElement} Query Demo page.
 */
export default function QueryDemoPage()
{
    const { id } = useParams();

    return (
        <page is='div' id='query-demo-page'>
            QUERY: {id}
        </page>
    );
}

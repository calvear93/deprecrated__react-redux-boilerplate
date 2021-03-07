import './main-page.scss';
import { SampleHandler } from 'store/sample';
import { useEffect } from 'react';
import { useActionDispatch, usePartition } from 'modules/store/hooks';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
 */
export default function MainPage()
{
    // const dispatch = useDispatch();Ssadsadsasadsa
    const act = useActionDispatch(SampleHandler.Type.EXEC);
    const st = usePartition(SampleHandler);

    console.log(st);

    useEffect(() =>
    {
        act({ pl: 'hola' });
    }, []);

    return (
        <page is='div' id='main-page'>
            CONTENIDO
        </page>
    );
}

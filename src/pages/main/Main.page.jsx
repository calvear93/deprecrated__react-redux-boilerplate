import './main-page.scss';
import { SamplePartition } from 'store/sample';
import { useEffect } from 'react';
import { useActionDispatch, usePartition } from '@calvear/react-redux/hooks';

/**
 * Main page.
 *
 * @returns {React.ReactElement} Main page.
 */
export default function MainPage()
{
    // const dispatch = useDispatch();Ssadsadsasadsa
    const act = useActionDispatch(SamplePartition.Type.EXEC);
    const st = usePartition(SamplePartition);

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

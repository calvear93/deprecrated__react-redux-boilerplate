import Footer from './Footer';
import Header from './Header';
import { RouterService } from 'modules/router';
import { Breadcrumbs } from 'modules/ui/components';
import './app-layout.scss';

/**
 * App layout (wrapper for pages with header/footer).
 *
 * @param {object} props component props.
 * @param {React.ReactElement} props.children component for render inside.
 *
 * @returns {React.ReactElement} app layout.
 */
export default function AppLayout({ children })
{
    return (
        <main id='app-layout'>
            <Header />

            <Breadcrumbs routes={ RouterService.Breadcrumbs } />

            {children}

            <Footer />
        </main>
    );
}

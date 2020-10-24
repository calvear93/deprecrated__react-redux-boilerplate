/**
 * Footer for App Layout.
 *
 * @param {object} props component props.
 * @param {string} props.text footer text.
 *
 * @returns {React.ReactElement} footer component.
 */
export default function Footer({ text })
{
    return (
        <footer>
            {text}
        </footer>
    );
}

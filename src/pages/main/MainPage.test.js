import React from 'react';
import { render } from '@testing-library/react';
import MainPage from './MainPage';

describe('testing MainPage', () =>
{
    test('rendering', () =>
    {
        render(<MainPage />);
    });
});

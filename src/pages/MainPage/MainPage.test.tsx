import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPage } from './MainPage';
import { getNextSortBy, updateCategories } from '../../utils';
import { Category } from '../../types';

jest.mock('../../utils/getNextSortBy', () => {
    return {
        __esModule: true,
        getNextSortBy: jest.fn(() => 'по умолчанию'),
    };
});

jest.mock('../../utils/updateCategories', () => {
    return {
        __esModule: true,
        updateCategories: jest.fn((categories, category) => []),
    };
});

beforeAll(() => jest.useFakeTimers().setSystemTime(new Date('2000-01-09T04:54:00')));

afterAll(() => jest.useRealTimers());

afterEach(jest.clearAllMocks);

describe('Testing MainPage', () => {
    it('should render correctly', () => {
        const renderPage = render(<MainPage />);
        expect(renderPage.asFragment()).toMatchSnapshot();
    });

    it('should call getNextSortBy at once', () => {
        const renderPage = render(<MainPage />);
        expect(getNextSortBy).toHaveBeenCalledTimes(0);
        fireEvent.click(renderPage.getByText('Сортировать по умолчанию'));
        expect(getNextSortBy).toHaveBeenCalledTimes(1);
    });

    it('should call updateCategories at once', () => {
        const renderPage = render(<MainPage />);
        expect(updateCategories).toHaveBeenCalledTimes(0);
        const category = renderPage
            .getAllByText('Для дома')
            .find((el) => el.classList.contains('categories__badge'));
        if (!category) {
            return;
        }
        fireEvent.click(category);
        expect(updateCategories).toHaveBeenCalledTimes(1);
    });
});

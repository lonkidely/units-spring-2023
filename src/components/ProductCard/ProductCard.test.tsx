import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { getPrice } from '../../utils';
import { Product } from '../../types';

jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
    getPrice: jest.fn(() => '300 $'),
}));

afterEach(jest.clearAllMocks);

describe('Product card test', () => {
    const testProduct: Product = {
        id: 1,
        name: 'Test product 1',
        description: 'Description of test product 1',
        price: 300,
        priceSymbol: '$',
        category: 'Для дома',
        imgUrl: '/iphone.png',
    };

    it('should render correctly with image', () => {
        const renderedCard = render(<ProductCard {...testProduct} />);
        expect(renderedCard.asFragment()).toMatchSnapshot();
        expect(renderedCard.baseElement.querySelector('.product_card_image')).toBeDefined();
    });

    it('should render correctly without image', () => {
        testProduct.imgUrl = '';
        const renderedCard = render(<ProductCard {...testProduct} />);
        expect(renderedCard.asFragment()).toMatchSnapshot();
        expect(renderedCard.baseElement.querySelector('.product_card_image')).toBeNull();
    });

    it('should call getPrice once', () => {
        expect(getPrice).toHaveBeenCalledTimes(0);
        render(<ProductCard {...testProduct} />);
        expect(getPrice).toHaveBeenCalledTimes(1);
    });
});

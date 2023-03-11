import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { getPrice } from "../../utils";
import {Product} from "../../types";

jest.mock('../../utils/getPrice', () => {
    return {
        __esModule: true,
        getPrice: jest.fn(() => '300 $'),
    };
});

afterEach(jest.clearAllMocks);

describe('Product card test', () => {
    const testProduct: Product = {
        id: 1,
        name: 'Test product 1',
        description: 'Description of test product 1',
        price: 300,
        priceSymbol: '$',
        category: 'Для дома',
        imgUrl: '/never_gonna_give_you_up.png',
    };

    it('should render correctly', () => {
        const renderedCard = render(<ProductCard {...testProduct} />);
        expect(renderedCard.asFragment()).toMatchSnapshot();
    });

    it('should call getPrice once', () => {
        expect(getPrice).toHaveBeenCalledTimes(0);
        render(<ProductCard {...testProduct} />);
        expect(getPrice).toHaveBeenCalledTimes(1);
    });
});

import { getProductRUBPrice, productComparator } from '../productComparator';
import { Product, SortBy, PriceSymbol } from '../../types';

describe('test getProductRUBPrice function', () => {
    it.each<[number, PriceSymbol, number]>([
        [100, '₽', 100],
        [50, '$', 3500],
    ])('should be equal', (price, priceSymbol, expected) => {
        const testProduct: Product = {
            id: 0,
            name: 'empty',
            description: 'empty',
            price,
            priceSymbol,
            category: 'Для дома',
        };
        expect(getProductRUBPrice(testProduct)).toBe(expected);
    });
});

describe('test product comparator function', () => {
    const testProductRUB: Product = {
        id: 1,
        name: 'Unknown thing for home',
        description: 'I dont know what is it',
        price: 300,
        category: 'Для дома',
    };

    const testProductUSD: Product = {
        id: 2,
        name: 'Cheap clothes',
        description: 'I dont know what is it',
        price: 4,
        priceSymbol: '$',
        category: 'Одежда',
    };

    it.each<[SortBy, Product, Product]>([
        ['по умолчанию', testProductRUB, testProductUSD],
        ['по возрастанию цены', testProductUSD, testProductUSD],
        ['по убыванию цены', testProductRUB, testProductRUB],
    ])('should return 0', (order, lhs, rhs) => {
        expect(productComparator(order)(lhs, rhs)).toBe(0);
    });

    it.each<[SortBy, Product, Product]>([
        ['по убыванию цены', testProductUSD, testProductRUB],
        ['по возрастанию цены', testProductRUB, testProductUSD],
    ])('should return 1', (order, lhs, rhs) => {
        expect(productComparator(order)(lhs, rhs)).toBe(1);
    });

    it.each<[SortBy, Product, Product]>([
        ['по убыванию цены', testProductRUB, testProductUSD],
        ['по возрастанию цены', testProductUSD, testProductRUB],
    ])('should return -1', (order, lhs, rhs) => {
        expect(productComparator(order)(lhs, rhs)).toBe(-1);
    });
});

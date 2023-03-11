import { Category, Product } from '../../types';
import { applyCategories } from '../applyCategories';

describe('test applyCategories function', () => {
    const testProducts: Product[] = [
        {
            id: 1,
            name: 'Test product 1',
            description: 'Test description 1',
            price: 100,
            category: 'Одежда',
        },
        {
            id: 2,
            name: 'Test product 2',
            description: 'Test description 2',
            price: 200,
            category: 'Электроника',
        },
        {
            id: 3,
            name: 'Test product 3',
            description: 'Test description 3',
            price: 300,
            category: 'Для дома',
        },
    ];

    it('should return all products, categories length === 0', () => {
        expect(applyCategories(testProducts, [])).toEqual(testProducts);
    });

    test.each([
        {
            products: testProducts,
            categories: ['Электроника'],
        },
        {
            products: testProducts,
            categories: ['Электроника', 'Для дома'],
        },
        {
            products: testProducts,
            categories: ['Электроника', 'Для дома', 'Одежда'],
        },
    ])('should be equals', ({ products, categories }) => {
        expect(applyCategories(products, categories as Category[])).toEqual(
            products.filter((prod) => categories.includes(prod.category))
        );
    });
});

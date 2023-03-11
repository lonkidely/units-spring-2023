import { Category } from '../../types';
import { updateCategories } from '../updateCategories';

describe('test updateCategories function', () => {
    it.each<[Category[], Category, Category[]]>([
        [[], 'Для дома', ['Для дома']],
        [['Для дома'], 'Одежда', ['Для дома', 'Одежда']],
        [['Для дома', 'Одежда'], 'Электроника', ['Для дома', 'Одежда', 'Электроника']],
        [['Для дома', 'Одежда', 'Электроника'], 'Одежда', ['Для дома', 'Электроника']],
        [['Для дома', 'Электроника'], 'Электроника', ['Для дома']],
        [['Для дома'], 'Для дома', []],
    ])('should be equal', (categories, category, expected) => {
        expect(updateCategories(categories, category)).toEqual(expected);
    });
});

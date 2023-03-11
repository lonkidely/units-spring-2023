import { getNextSortBy } from '../getNextSortBy';
import { SortBy } from '../../types';

describe('test getNextSortBy function', () => {
    it.each<[SortBy, string]>([
        ['по умолчанию', 'по возрастанию цены'],
        ['по возрастанию цены', 'по убыванию цены'],
        ['по убыванию цены', 'по умолчанию'],
    ])('should return next state', (sortBy, expected) => {
        expect(getNextSortBy(sortBy)).toBe(expected);
    });
});

import { Check } from '../src';

describe('Check', () => {
    it('should be available', () => {
        expect(Check.assert(true)).toBe(true);
    });
});

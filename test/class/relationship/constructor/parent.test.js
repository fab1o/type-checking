import Parent from './parent';

describe('Parent', () => {
    it('throw an error', () => {
        expect(() => {
            new Parent();
        }).toThrow('MyParent(name) name expected a String but received undefined.');
    });
});

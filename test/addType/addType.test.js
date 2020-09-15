import { addType } from '../../src';

describe('addType', () => {
    it('validator is expected', () => {
        expect(() => {
            addType('blueberry');
        }).toThrow(
            'addType(name, validator, options) validator expected a Function that returns boolean.'
        );
    });

    it('options is expected a valid Object', () => {
        expect(() => {
            addType('blueberry', () => false, null);
        }).toThrow('addType(name, validator, options) [options] expected an Object.');
    });
});

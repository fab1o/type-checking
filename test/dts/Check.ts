import { Check } from '../../index';

const a: boolean = Check.number(3);

const b: any = 2;

if (Check.string(b)) {
    const c = b.slice(0, 1);
}

Check.map({ val: 1, val2: 2 }, { val: Check.number, val2: Check.string });

Check.even(3);

Check.not.even(3);

Check.maybe.even(2);

Check.assert.like({ foo: 'bar' }, { baz: 'qux' });

Check.assert(false, 'msg', Error);

Check.assert.not.like({ foo: 'bar' }, { baz: 'qux' });

Check.assert.maybe.like(undefined, { foo: 'bar' });

Check.assert(
    function a(): any {
        return {};
    },
    'Something went wrong',
    Error
);

Check.apply(['foo', 'bar', ''], Check.nonEmptyString);

Check.any(Check.apply([1, 2, 3, ''], Check.string));

Check.any(Check.map({ foo: 0, bar: '' }, { foo: Check.number, bar: Check.string }));

Check.all(Check.map({ foo: 0, bar: '' }, { foo: Check.number, bar: Check.string }));

Check.all(Check.apply([1, 2, 3, ''], Check.string));

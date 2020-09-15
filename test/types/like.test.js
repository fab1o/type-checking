import { Types, typecheck } from '../../src';

describe('Types.like', () => {
    const schema = {
        name: '',
        grades: []
    };

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    student: Types.like(schema)
                },
                [
                    {
                        name: false,
                        grades: []
                    }
                ]
            );
        }).toThrow(
            '{student} student expected an Object that matches {"name","grades"} but received an Object: {name:false, grades:[]}.'
        );
    });

    it('expect to throw an Error', () => {
        expect(() => {
            typecheck(
                {
                    students: Types.array.of.like(schema)
                },
                [
                    [
                        {
                            name: '',
                            grades: []
                        },
                        {
                            name: false,
                            grades: []
                        }
                    ]
                ]
            );
        }).toThrow(
            '{students} students expected an Array of objects that match {"name","grades"} but received an Array: [{...}, {...}].'
        );
    });

    it('throw an Error when value is null', () => {
        expect(() => {
            typecheck(
                {
                    students: Types.array.of.like(schema)
                },
                [null]
            );
        }).toThrow(
            '{students} students expected an Array of objects that match {"name","grades"} but received null.'
        );
    });

    it('throw an Error when value is undefined', () => {
        expect(() => {
            typecheck(
                {
                    students: Types.array.of.like(schema)
                },
                [undefined]
            );
        }).toThrow(
            '{students} students expected an Array of objects that match {"name","grades"} but received undefined.'
        );
    });
});

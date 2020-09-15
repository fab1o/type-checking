import { Types, typecheck } from '../../../src';

describe('Types.object - nesting', () => {
    it('should not fail on multi-level nesting', () => {
        expect(() => {
            typecheck(
                {
                    parent: Types.object({
                        child: Types.object({
                            child: Types.object({
                                child: Types.object({
                                    child: Types.object()
                                })
                            })
                        })
                    })
                },
                [
                    {
                        child: {
                            child: {
                                child: {
                                    child: {}
                                }
                            }
                        }
                    }
                ]
            );
        }).not.toThrow();
    });

    it('should not fail when parent is optional but children is not', () => {
        expect(() => {
            typecheck(
                {
                    parent: Types.object({
                        child: Types.object({
                            child: Types.object()
                        })
                    }).optional
                },
                []
            );
        }).not.toThrow();
    });

    it('should display correct error message on multi-level nesting', () => {
        expect(() => {
            typecheck(
                {
                    parent: Types.object({
                        child1: Types.object({
                            child2: Types.object({
                                child3: Types.object({
                                    child4: Types.object()
                                })
                            })
                        })
                    })
                },
                [
                    {
                        child1: {
                            child2: {
                                child3: {
                                    fail: true
                                }
                            }
                        }
                    }
                ]
            );
        }).toThrow(
            '{{ { { { child4 } } } }} child3.child4 expected an Object but received undefined.'
        );
    });

    it('should fail on year2 and display correct message', () => {
        expect(() => {
            typecheck(
                {
                    outer: Types.number,
                    options: Types.object({
                        name: Types.string,
                        year: Types.number,
                        options2: Types.object({
                            name2: Types.string,
                            year2: Types.number
                        })
                    })
                },
                [
                    2001,
                    {
                        year: 2020,
                        name: '',
                        options2: {
                            year2: true,
                            name2: ''
                        }
                    }
                ]
            );
        }).toThrow(
            '{outer, { name, year, { name2, year2 } }} options2.year2 expected a Number but received a Boolean: true.'
        );
    });

    it('should fail on arrayOptions and display correct message using Types.array.of.objects', () => {
        expect(() => {
            typecheck(
                {
                    outer: Types.number,
                    arrayOptions: Types.array.of.object({
                        name: Types.string,
                        year: Types.number
                    })
                },
                [
                    2001,
                    {
                        year: 2020,
                        name: ''
                    }
                ]
            );
        }).toThrow(
            '{outer, arrayOptions} arrayOptions expected an Array of objects with properties but received an Object: {year:2020, name:""}.'
        );
    });

    it('should fail on year2 and display correct message using Types.array.of.objects', () => {
        expect(() => {
            typecheck(
                {
                    outer: Types.number,
                    arrayOptions: Types.array.of.object({
                        name: Types.string,
                        year: Types.number,
                        arrayOptions2: Types.array.of.object({
                            name: Types.string,
                            year: Types.number
                        })
                    })
                },
                [
                    2001,
                    [
                        {
                            year: 2020,
                            name: '',
                            arrayOptions2: [
                                {
                                    year: 2020,
                                    name: ''
                                },
                                {
                                    year: true,
                                    name: ''
                                }
                            ]
                        }
                    ]
                ]
            );
        }).toThrow(
            '{outer, [{ name, year, [{ name, year }] }]} arrayOptions2.year expected a Number but received a Boolean: true.'
        );
    });
});

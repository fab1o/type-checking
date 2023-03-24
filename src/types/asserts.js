import {
    customValidateCreator,
    genericValidateCreator,
    objectValidateCreator,
    skipValidateCreator
} from '../validateCreator';
import { getTypeToString, stringifyKeys, stringifyValues, stringifyRegExp } from '../util';

import { dateStringValidator } from './validator';

/**
 * Asserts object defines all the asserts of the Types (check-types library).
 * All assserts have an 'array.of' equivalent except Types.skip
 * {a} and {b} are used to determine if an assert receives argument(s).
 */
export const Asserts = [
    {
        assertName: 'array',
        singular: 'an Array',
        plural: 'arrays',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'arrayLike',
    //     singular: 'an Array-like',
    //     plural: 'arrays-like',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'arrayBuffer',
        singular: 'an ArrayBuffer',
        plural: 'arrayBuffers',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
        // , orAsserts: ['nonEmptyString']
    },
    {
        assertName: 'arrayBufferView',
        singular: 'an ArrayBufferView',
        plural: 'arrayBufferViews',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
        // , orAsserts: ['nonEmptyString']
    },
    {
        assertName: 'assigned',
        singular: 'an assigned value',
        plural: 'assigned values',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'between',
    //     singular: 'a Number between {a} and {b}',
    //     plural: 'numbers between {a} and {b}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'boolean',
        singular: 'a Boolean',
        plural: 'booleans',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'custom',
        expectArgs: true,
        isArrayable: false,
        validateCreator: customValidateCreator
    },
    {
        assertName: 'date',
        singular: 'a Date',
        plural: 'dates',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'dateString',
        singular: 'a String in ISO date format',
        plural: 'strings in ISO date format',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator,
        validator: dateStringValidator
    },
    // {
    //     assertName: 'emptyArray',
    //     singular: 'an empty Array',
    //     plural: 'empty arrays',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'emptyObject',
    //     singular: 'an empty Object',
    //     plural: 'empty objects',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'emptyString',
    //     singular: 'an empty String',
    //     plural: 'empty strings',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'equal',
    //     singular: '{a}',
    //     plural: '{a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     stringifyArgs: getTypeToString,
    //     validateCreator: genericValidateCreator
    // },
    // even{
    //     assertName: 'even',
    //     singular: 'an even Number',
    //     plural: 'even numbers',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'float',
    //     singular: 'a float Number',
    //     plural: 'float numbers',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'function',
        singular: 'a Function',
        plural: 'functions',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'hasLength',
    //     singular: 'that has length of {a}',
    //     plural: 'data with length of {a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'greater',
    //     singular: 'a Number greater than {a}',
    //     plural: 'numbers greater than {a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'greaterOrEqual',
        singular: 'a Number greater or equal to {a}',
        plural: 'numbers greater or equal to {a}',
        expectArgs: true,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'in',
        singular: 'one of [{a}]',
        plural: 'one of [{a}]',
        expectArgs: true,
        isArrayable: true,
        stringifyArgs: stringifyValues,
        validateCreator: genericValidateCreator
        // , orAsserts: ['nonEmptyString', 'string']
    },
    {
        assertName: 'inheritance',
        arrayLike: 'inheritance',
        singular: 'a type that inherits from {a}',
        plural: 'types that inherit from {a}',
        expectArgs: true,
        isArrayable: true,
        stringifyArgs: getTypeToString,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'inRange',
    //     singular: 'a Number in the range {a} to {b}',
    //     plural: 'numbers in the range {a} to {b}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'instance',
    //     singular: 'an instance of {a}',
    //     plural: 'instances of {a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     stringifyArgs: getTypeToString,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'instanceStrict',
        singular: 'an instance of {a}',
        plural: 'instances of {a}',
        expectArgs: true,
        isArrayable: true,
        stringifyArgs: getTypeToString,
        validateCreator: genericValidateCreator
        // , orAsserts: ['object']
    },
    {
        assertName: 'integer',
        singular: 'an integer',
        plural: 'integers',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
        // , andAsserts: ['positive']
    },
    // {
    //     assertName: 'iterable',
    //     singular: 'an iterable object',
    //     plural: 'iterable objects',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'keyIn',
        singular: 'as a key in [{a}]',
        plural: 'as keys in [{a}]',
        expectArgs: true,
        isArrayable: false,
        stringifyArgs: stringifyKeys,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'less',
    //     singular: 'a Number less than {a}',
    //     plural: 'numbers less than {a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'lessOrEqual',
    //     singular: 'a Number less or equal to {a}',
    //     plural: 'Numbers less or equal to {a}',
    //     expectArgs: true,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'like',
        singular: 'an Object that matches {{a}}',
        plural: 'objects that match {{a}}',
        expectArgs: true,
        isArrayable: false,
        stringifyArgs: stringifyKeys,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'match',
        singular: 'a String that matches /{a}/',
        plural: 'strings that match /{a}/',
        expectArgs: true,
        isArrayable: false,
        stringifyArgs: stringifyRegExp,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'negative',
    //     singular: 'a Number lower than 0',
    //     plural: 'numbers lower than 0',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'nonEmptyArray',
    //     singular: 'a non-empty Array',
    //     plural: 'non-empty arrays',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'nonEmptyObject',
        singular: 'a non-empty Object',
        plural: 'non-empty objects',
        expectArgs: false,
        isArrayable: true,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'nonEmptyString',
        singular: 'a non-empty String',
        plural: 'non-empty strings',
        expectArgs: false,
        isArrayable: true,
        validateCreator: genericValidateCreator
    },
    // {
    //     assertName: 'null',
    //     singular: 'null',
    //     plural: 'null',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'number',
        singular: 'a Number',
        plural: 'numbers',
        expectArgs: false,
        isArrayable: true,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'object',
        singular: 'an Object',
        plural: 'objects',
        expectArgs: true,
        isArrayable: true,
        validateCreator: objectValidateCreator
    },
    // {
    //     assertName: 'odd',
    //     singular: 'an odd Number',
    //     plural: 'odd numbers',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    {
        assertName: 'positive',
        singular: 'a Number greater than 0',
        plural: 'numbers greater than 0',
        expectArgs: false,
        isArrayable: false,
        validateCreator: genericValidateCreator
    },
    {
        assertName: 'skip',
        singular: 'a value',
        expectArgs: false,
        isExtensible: false,
        isArrayable: false,
        validateCreator: skipValidateCreator
    },
    {
        assertName: 'string',
        singular: 'a String',
        plural: 'strings',
        expectArgs: false,
        isArrayable: true,
        validateCreator: genericValidateCreator
    }
    // ,
    // {
    //     assertName: 'thenable',
    //     singular: 'a Promise',
    //     plural: 'promises',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // },
    // {
    //     assertName: 'undefined',
    //     singular: 'undefined',
    //     plural: 'undefined',
    //     expectArgs: false,
    //     isArrayable: false,
    //     validateCreator: genericValidateCreator
    // }
];

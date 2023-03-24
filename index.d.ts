// Type definitions for @fab1o/type-checking
//#region addType
// interface MinTypeOptions {
//     singular?: string;
//     plural?: string;
//     expectArgs?: boolean;
//     autoDisplayArgs?: boolean;
//     stringifyArgs?: Function;
// }

// export function addType(name: string, validator: Function, options?: MinTypeOptions): void;
// export function extendParams(...args: object[]): void;
// export function validateParams(params: object): boolean;
//#endregion

//#region typecheck
export function typecheck(
    object: string | object,
    method: string | Function,
    params: object,
    args: any[] | IArguments | object,
    error?: typeof Error | Error
): void;

export function typecheck(
    func: string | Function | object,
    params: object,
    args: any[] | IArguments | object,
    error?: typeof Error | Error
): void;

export function typecheck(
    params: object,
    args: any[] | IArguments | object,
    error?: typeof Error | Error
): void;

export namespace typecheck {
    function warn(
        object: string | object,
        method: string | Function,
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
    function warn(
        func: string | Function | object,
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
    function warn(
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
    function atLeastOne(
        object: string | object,
        method: string | Function,
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
    function atLeastOne(
        func: string | Function | object,
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
    function atLeastOne(
        params: object,
        args: any[] | IArguments | object,
        error?: typeof Error | Error
    ): void;
}
//#endregion

//#region Config
export namespace Config {
    enum NameMethod {
        name = 'name',
        toString = 'toString'
    }
    enum LoggerMethod {
        log = 'log',
        warn = 'warn',
        info = 'info',
        error = 'error'
    }

    let etceteraOn: boolean;
    let expectedMessage: string;
    let displayParamExt: boolean;
    let parentsOn: boolean;
    let receivedMessage: string;
    let withPropsMessage: string;
    let nameMethodPriority: Config.NameMethod;
    let errorType: Error;
    let logger: object;
    let loggerMethodForOrType: Config.LoggerMethod | null;

    function reset(): void;
    function resetErrorType(): void;
    function setup(options?: IConfigOptions): void;
}

interface IConfigOptions {
    ErrorType?: Error | Function;
    logger?: object;
    etcetera?: boolean;
    parents?: boolean;
    displayParamExt?: boolean;
    expectedMessage?: string;
    receivedMessage?: string;
    withPropsMessage?: string;
    nameMethodPriority?: string;
    loggerMethodForOrType?: Config.LoggerMethod | null;
}

//#endregion

//#region Types
interface IArray extends IExtensible {
    of: ITypes;
}

interface IExtensible {
    optional: ILoggable;
    warn: void;
}

// interface IArray extends IExtensibleWithOptional {
//     (a: any): void;
//     of: ITypes;
//     and: IHasLengthTypeJustOptional;
// }

// interface IHasLengthType {
//     hasLength(x: number): IExtensibleWithJustOptional;
// }
// interface IHasLengthTypeJustOptional {
//     hasLength(x: number): IExtensibleWithJustOptional;
// }

// interface IArrayOf<T> extends IExtensibleWithJustOptional {
//     array: {
//         of: T;
//     };
// }

interface ILoggable {
    warn: void;
}

// interface IExtensibleWithJustOptional extends ILoggable {
//     optional: ILoggable;
//     nullable: ILoggable;
//     undefinable: ILoggable;
// }
// interface IExtensibleWithOptional extends ILoggable {
//     optional: ILoggable;
//     nullable: ILoggable;
//     undefinable: ILoggable;
//     or: INullTypes;
// }
// interface IExtensibleWithOr<T> extends IExtensibleWithJustOptional {
//     or: IArrayOf<T> & INullTypes & T;
// }
// interface IExtensibleWithAnd<T> extends IExtensibleWithOptional {
//     and: IArrayOf<T> & T;
// }
// interface IExtensibleWithOrAnd<T, W> extends IExtensibleWithAnd<W> {
//     or: IArrayOf<T> & INullTypes & T;
// }

// interface INullTypes {
//     null: ILoggable;
//     undefined: ILoggable;
// }
// interface IClassTypes {
//     instance<T extends object>(x: T): IExtensibleWithJustOptional;
//     instanceStrict<T extends object>(x: T): IExtensibleWithJustOptional;
// }

// interface IObjectTypes {
//     like<T extends object>(x: T): IExtensibleWithJustOptional;
//     nonEmptyObject: IExtensibleWithJustOptional;
//     object(x?: object): IExtensibleWithJustOptional;
//     instanceStrict<T extends object>(x: T): IExtensibleWithJustOptional;
//     instance<T extends object>(x: T): IExtensibleWithJustOptional;
//     inheritance<T extends Function>(x: T): IExtensibleWithJustOptional;
// }

// interface IEnumTypes {
//     in<T extends object>(x: T): IExtensibleWithJustOptional;
//     keyIn<T extends object>(x: T): IExtensibleWithJustOptional;
//     arrayBufferView: IExtensibleWithJustOptional;
// }

// interface IOddEvenTypes {
//     negative: IExtensibleWithJustOptional;
//     positive: IExtensibleWithJustOptional;
//     integer: IExtensibleWithJustOptional;
//     float: IExtensibleWithJustOptional;
// }

// interface IIntegerFloatTypes {
//     odd: IExtensibleWithJustOptional;
//     even: IExtensibleWithJustOptional;
//     negative: IExtensibleWithJustOptional;
//     positive: IExtensibleWithJustOptional;
//     greater: IExtensibleWithJustOptional;
//     less: IExtensibleWithJustOptional;
//     greaterOrEqual: IExtensibleWithJustOptional;
//     lessOrEqual: IExtensibleWithJustOptional;
// }

// interface INegativePositiveTypes {
//     odd: IExtensibleWithJustOptional;
//     even: IExtensibleWithJustOptional;
//     integer: IExtensibleWithJustOptional;
//     float: IExtensibleWithJustOptional;
// }

// interface ILessTypes {
//     less(x: number): IExtensibleWithJustOptional;
// }
// interface IGreaterTypes {
//     greater(x: number): IExtensibleWithJustOptional;
// }

// interface IStringTypes {
//     nonEmptyString: IExtensibleWithJustOptional;
//     string: IExtensibleWithJustOptional;
// }

// interface IStringArrayTypes {
//     array: IExtensibleWithJustOptional;
//     string: IExtensibleWithJustOptional;
// }

// interface ITypes {
//     array: IArray;
//     arrayBufferView: IExtensibleWithOr<IStringTypes>;
//     // arrayLike: IExtensibleWithOptional;
//     assigned: ILoggable;
//     between(x: number, y: number): IExtensibleWithOptional;
//     boolean: IExtensibleWithOptional;
//     custom(
//         customValidator: Function,
//         errorMessage?: String,
//         ...args: any[]
//     ): IExtensibleWithJustOptional;
//     date: IExtensibleWithOptional;
//     dateString: IExtensibleWithOptional;
//     emptyArray: IExtensibleWithOptional;
//     emptyObject: IExtensibleWithOptional;
//     emptyString: IExtensibleWithOptional;
//     even: IExtensibleWithAnd<IOddEvenTypes>;
//     equal: IExtensibleWithOptional;
//     float: IExtensibleWithAnd<IIntegerFloatTypes>;
//     function: IExtensibleWithOptional;
//     greater(x: number): IExtensibleWithOrAnd<ILessTypes, INegativePositiveTypes>;
//     greaterOrEqual(x: number): IExtensibleWithOrAnd<ILessTypes, INegativePositiveTypes>;
//     hasLength(x: number): IExtensibleWithAnd<IStringArrayTypes>;
//     in<T extends object>(x: T): IExtensibleWithOr<IStringTypes>;
//     inheritance<T extends Function>(x: T): IExtensibleWithOptional;
//     inRange(x: number, y: number): IExtensibleWithOptional;
//     instance<T extends object>(x: T): IExtensibleWithOr<IObjectTypes>;
//     instanceStrict<T extends object>(x: T): IExtensibleWithOr<IObjectTypes>;
//     integer: IExtensibleWithAnd<IIntegerFloatTypes>;
//     iterable: IExtensibleWithOptional;
//     keyIn<T extends object>(x: T): IExtensibleWithOr<IStringTypes>;
//     less(x: number): IExtensibleWithOrAnd<IGreaterTypes, INegativePositiveTypes>;
//     lessOrEqual(x: number): IExtensibleWithOrAnd<IGreaterTypes, INegativePositiveTypes>;
//     like<T extends object>(x: T): IExtensibleWithOr<IClassTypes>;
//     match(x: RegExp): IExtensibleWithOptional;
//     nan: IExtensibleWithOptional;
//     negative: IExtensibleWithAnd<INegativePositiveTypes>;
//     nonEmptyArray: IArray;
//     nonEmptyObject: IExtensibleWithOr<IClassTypes>;
//     nonEmptyString: IExtensibleWithOr<IEnumTypes>;
//     null: ILoggable;
//     number: IExtensibleWithOptional;
//     object(x?: object): IExtensibleWithOr<IClassTypes>;
//     odd: IExtensibleWithAnd<IOddEvenTypes>;
//     positive: IExtensibleWithAnd<INegativePositiveTypes>;
//     skip: ILoggable;
//     string: IExtensibleWithOrAnd<IEnumTypes, IHasLengthType>;
//     thenable: IExtensibleWithOptional;
//     undefined: ILoggable;
// }

interface ITypes {
    array: IArray;
    // arrayLike: IExtensible;
    arrayBuffer: IExtensible;
    arrayBufferView: IExtensible;
    assigned: IExtensible;
    // between(a: number, b: number): IExtensible;
    boolean: IExtensible;
    custom(customValidator: Function, errorMessage?: string, ...args: any[]): IExtensible;
    date: IExtensible;
    dateString: IExtensible;
    // emptyArray: IExtensible;
    // emptyObject: IExtensible;
    // emptyString: IExtensible;
    // even: IExtensible;
    // equal: IExtensible;
    // float: IExtensible;
    function: IExtensible;
    // hasLength(num: number): IExtensible;
    // greater(num: number): IExtensible;
    greaterOrEqual(num: number): IExtensible;
    in<T extends object>(x: T): IExtensible;
    inheritance<T extends Function>(prototype: T): IExtensible;
    instanceStrict<T extends Function>(prototype: T): IExtensible;
    // instance<T extends Function>(prototype: T): IExtensible;
    // inRange(a: number, b: number): IExtensible;
    integer: IExtensible;
    // iterable: IExtensible;
    keyIn<T extends object>(x: T): IExtensible;
    // less(num: number): IExtensible;
    // lessOrEqual(num: number): IExtensible;
    like<T extends object>(x: T): IExtensible;
    match(regexp: RegExp): IExtensible;
    // nan: IExtensible;
    // negative: IExtensible;
    // nonEmptyArray: IArray;
    nonEmptyObject: IExtensible;
    nonEmptyString: IExtensible;
    // null: IExtensible;
    number: IExtensible;
    object(obj?: object): IExtensible;
    // odd: IExtensible;
    positive: IExtensible;
    skip: ILoggable;
    string: IExtensible;
    // thenable: IExtensible;
    // undefined: IExtensible;
}

export const Types: ITypes;
//#endregion

//#region Check - Copy from https://github.bamtech.co/fed-packages/check-types/blob/master/src/index.d.ts
type NegationFunction = (val: any) => boolean;

type MaybeFunction = <T>(val: T) => boolean | T;

interface AssertFunction extends ICheck {
    <T>(possibleFalsy: T, message?: string, errorType?: { new (...args: any[]): any }): T;
}

interface ICheck {
    /* General predicates */
    equal(a: any, b: any): a is typeof b;
    null(a: any): a is null;
    undefined(a: any): a is undefined;
    assigned(a: any): boolean;
    primitive(a: any): a is number | string | boolean | null | undefined | symbol;

    hasLength(a: any, length: number): a is string | any[];

    /* String predicates */
    string(a: any): a is string;
    emptyString(a: any): a is '';
    nonEmptyString(a: any): a is string;
    match(a: any, b: RegExp): a is string;

    /* Number predicates */
    number(a: any): a is number;
    zero(a: any): a is 0;
    integer(a: any): a is number;
    greater(a: any, greaterThan: number): a is number;
    greaterOrEqual(a: any, greaterOrEqual: number): a is number;
    less(a: any, lessThan: number): a is number;
    lessOrEqual(a: any, lessOrEqual: number): a is number;
    between(a: any, b: number, c: number): a is number;
    inRange(a: any, b: number, c: number): a is number;
    positive(a: any): a is number;
    negative(a: any): a is number;
    odd(a: any): a is number;
    even(a: any): a is number;
    nan(a: any): a is number;
    infinity(a: any): a is typeof Infinity;

    arrayBuffer(a: any): a is ArrayBuffer;
    arrayBufferView(
        a: any
    ): a is
        | Int8Array
        | Uint8Array
        | Uint8ClampedArray
        | Int16Array
        | Uint16Array
        | Int32Array
        | Uint32Array
        | Float32Array
        | Float64Array
        | BigInt64Array
        | BigUint64Array
        | DataView;

    /* Boolean predicates */
    boolean(a: any): a is true | false;

    /* Object predicates */
    object(a: any): a is object;
    // this is boolean because const empty objects can still be modified
    emptyObject(a: any): a is {};
    nonEmptyObject(a: any): boolean;

    in<T extends object | string | any[]>(value: any, data: T): boolean;
    keyIn<T extends object | string | any[]>(key: any, data: T): key is keyof T;

    contains<T extends object | string | any[]>(data: T, value: any): boolean;
    containsKey<T extends object | string | any[]>(data: T, key: any): key is keyof T;

    thenable<T extends object>(obj?: any): obj is Promise<T>;

    instanceStrict<T extends Function>(a: any, prototype: T): a is T;
    instance<T extends Function>(a: any, prototype: T): a is T;
    like<T extends object>(a: any, duck: T): a is object;

    /* Array predicates */
    array(a: any): a is any[];
    // this is boolean because const empty arrays can still be modified
    emptyArray(a: any): a is [];
    nonEmptyArray(a: any): boolean;

    arrayLike(a: any): a is [] | string;
    iterable<T extends object | string | any[]>(a: any): a is Iterable<T>;

    /* Date predicates */
    date(a: any): a is Date;

    /* Function predicates */
    function(a: any): a is Function;
    throws(a: any): a is Function;

    /* Modifiers (some of them in their respected sections) */
    not: ICheck & NegationFunction;
    maybe: ICheck & MaybeFunction;
    assert: AssertFunction;

    /* Batch operations */
    apply<T>(arr: any[], predicate: (...args: any[]) => T): T[];

    map<T extends { [k: string]: any }>(
        arr: T,
        predicates: Partial<{ [k in keyof T]: (...args: any[]) => boolean }>
    ): Partial<{ [k in keyof T]: any }>;

    all(arr: boolean[] | { [k: string]: boolean }): boolean;

    any(arr: boolean[] | { [k: string]: boolean }): boolean;
}

export const Check: ICheck;
//#endregion

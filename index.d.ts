// Type definitions for @fab1o/type-checking
//#region addType
interface MinTypeOptions {
    singular?: string;
    plural?: string;
    expectArgs?: boolean;
    stringify?: Function;
}

export function addType(name: string, validator: Function, options?: MinTypeOptions): void;
export function extendParams(...args: object[]): void;
export function validateParams(params: object): boolean;
//#endregion

//#region typecheck
export function typecheck(
    object: string | object,
    method: string | Function,
    params: object,
    args: any[] | IArguments
): void;

export function typecheck(
    func: string | Function | object,
    params: object,
    args: any[] | IArguments
): void;

export function typecheck(params: object, args: any[] | IArguments): void;

export namespace typecheck {
    function atLeastOne(
        object: string | object,
        method: string | Function,
        params: object,
        args: any[] | IArguments
    ): void;
    function atLeastOne(
        func: string | Function | object,
        params: object,
        args: any[] | IArguments
    ): void;
    function atLeastOne(params: object, args: any[] | IArguments): void;
}
//#endregion

//#region Check
type NegationFunction = (val: any) => boolean;

type MaybeFunction = <T>(val: T) => boolean | T;

interface ArrayFunction {
    (a: any): a is any[];
    of: {
        [method: string]: boolean;
    };
}

interface ArrayLikeFunction {
    (a: any): a is ArrayLike<any>;
    of: {
        [method: string]: boolean;
    };
}

interface IterableFunction {
    (a: any): a is Iterable<any>;
    of: {
        [method: string]: boolean;
    };
}

interface ObjectFunction {
    (a: any): a is object;
    of: {
        [method: string]: boolean;
    };
}

interface AssertFunction extends ICheck {
    <T>(possibleFalsy: T, message?: string, errorType?: { new (...args: any[]): any }): T;
}

interface ICheck {
    /* General predicates */
    equal(a: any, b: any): boolean;
    null(a: any): a is null;
    undefined(a: any): a is undefined;
    assigned(a: any): boolean;
    primitive(a: any): a is number | string | boolean | null | undefined | symbol;
    hasLength(a: any, length: number): boolean;

    /* String predicates */
    string(a: any): a is string;
    emptyString(a: string): boolean;
    nonEmptyString(a: string): boolean;
    contains(a: any, value: any): boolean;
    in(value: any, a: any): boolean;
    match(a: string, b: RegExp): boolean;

    /* Number predicates */
    number(a: number);
    integer(a: any): a is number;
    zero(a: any): boolean;
    infinity(a: any): boolean;
    greater(num: number, greaterThan: number): boolean;
    greaterOrEqual(num: number, greaterOrEqual: number): boolean;
    less(num: number, lessThan: number): boolean;
    lessOrEqual(num: number, lessOrEqual: number): boolean;
    between(num: number, a: number, b: number): boolean;
    inRange(num: number, a: number, b: number): boolean;
    positive(num: number): boolean;
    negative(num: number): boolean;
    odd(num: number): boolean;
    even(num: number): boolean;

    /* Boolean predicates */
    boolean(a: any): a is boolean;

    /* Object predicates */
    object: ObjectFunction;
    emptyObject(a: object): boolean;
    nonEmptyObject(a: object): boolean;
    thenable<T extends object>(obj: T): boolean;
    containsKey<T extends object>(obj: T, a: any): boolean;
    keyIn<T extends object>(a: any, obj: T): boolean;
    instanceStrict<T extends object>(a: any, prototype: T): a is T;
    instance<T extends object>(a: any, prototype: T): a is T;
    like<T extends object>(a: any, duck: T): a is T;

    /* Array predicates */
    array: ArrayFunction;
    emptyArray(a: any[]): boolean;
    nonEmptyArray(a: any[]): boolean;
    arrayLike: ArrayLikeFunction;
    iterable: IterableFunction;
    includes(a: any[], value: any): boolean;

    /* Date predicates */
    date(a: any): a is Date;

    /* Function predicates */
    function(a: any): a is (...args: any[]) => any;

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
interface IArray extends IExtensibleWithOptional {
    (a: any): void;
    of: ITypes;
    and: IHasLengthTypeJustOptional;
}

interface IHasLengthType {
    hasLength(x: number): IExtensibleWithJustOptional;
}
interface IHasLengthTypeJustOptional {
    hasLength(x: number): IExtensibleWithJustOptional;
}

interface IArrayOf<T> extends IExtensibleWithJustOptional {
    array: {
        of: T;
    };
}

interface ILoggable {
    log: void;
    info: void;
    warn: void;
    error: void;
}

interface IExtensibleWithJustOptional extends ILoggable {
    optional: ILoggable;
    nullable: ILoggable;
    undefinable: ILoggable;
}
interface IExtensibleWithOptional extends ILoggable {
    optional: ILoggable;
    nullable: ILoggable;
    undefinable: ILoggable;
    or: INullTypes;
}
interface IExtensibleWithOr<T> extends IExtensibleWithJustOptional {
    or: IArrayOf<T> & INullTypes & T;
}
interface IExtensibleWithAnd<T> extends IExtensibleWithOptional {
    and: IArrayOf<T> & T;
}
interface IExtensibleWithOrAnd<T, W> extends IExtensibleWithAnd<W> {
    or: IArrayOf<T> & INullTypes & T;
}

interface INullTypes {
    null: ILoggable;
    undefined: ILoggable;
}
interface IClassTypes {
    instance<T extends object>(x: T): IExtensibleWithJustOptional;
    instanceStrict<T extends object>(x: T): IExtensibleWithJustOptional;
}

interface IObjectTypes {
    like<T extends object>(x: T): IExtensibleWithJustOptional;
    nonEmptyObject: IExtensibleWithJustOptional;
    object(x?: object): IExtensibleWithJustOptional;
    instanceStrict<T extends object>(x: T): IExtensibleWithJustOptional;
    instance<T extends object>(x: T): IExtensibleWithJustOptional;
    inheritance<T extends Function>(x: T): IExtensibleWithJustOptional;
}

interface IEnumTypes {
    in<T extends object>(x: T): IExtensibleWithJustOptional;
    keyIn<T extends object>(x: T): IExtensibleWithJustOptional;
    arrayBufferView: IExtensibleWithJustOptional;
}

interface IOddEvenTypes {
    negative: IExtensibleWithJustOptional;
    positive: IExtensibleWithJustOptional;
    integer: IExtensibleWithJustOptional;
    float: IExtensibleWithJustOptional;
}

interface IIntegerFloatTypes {
    odd: IExtensibleWithJustOptional;
    even: IExtensibleWithJustOptional;
    negative: IExtensibleWithJustOptional;
    positive: IExtensibleWithJustOptional;
    greater: IExtensibleWithJustOptional;
    less: IExtensibleWithJustOptional;
    greaterOrEqual: IExtensibleWithJustOptional;
    lessOrEqual: IExtensibleWithJustOptional;
}

interface INegativePositiveTypes {
    odd: IExtensibleWithJustOptional;
    even: IExtensibleWithJustOptional;
    integer: IExtensibleWithJustOptional;
    float: IExtensibleWithJustOptional;
}

interface ILessTypes {
    less(x: number): IExtensibleWithJustOptional;
}
interface IGreaterTypes {
    greater(x: number): IExtensibleWithJustOptional;
}

interface IStringTypes {
    nonEmptyString: IExtensibleWithJustOptional;
    string: IExtensibleWithJustOptional;
}

interface IStringArrayTypes {
    array: IExtensibleWithJustOptional;
    string: IExtensibleWithJustOptional;
}

interface ITypes {
    array: IArray;
    arrayBufferView: IExtensibleWithOr<IStringTypes>;
    arrayLike: IExtensibleWithOptional;
    assigned: ILoggable;
    between(x: number, y: number): IExtensibleWithOptional;
    boolean: IExtensibleWithOptional;
    custom(customValidator: Function, errorMessage?: String): IExtensibleWithJustOptional;
    date: IExtensibleWithOptional;
    dateString: IExtensibleWithOptional;
    emptyArray: IExtensibleWithOptional;
    emptyObject: IExtensibleWithOptional;
    emptyString: IExtensibleWithOptional;
    even: IExtensibleWithAnd<IOddEvenTypes>;
    equal: IExtensibleWithOptional;
    float: IExtensibleWithAnd<IIntegerFloatTypes>;
    function: IExtensibleWithOptional;
    greater(x: number): IExtensibleWithOrAnd<ILessTypes, INegativePositiveTypes>;
    greaterOrEqual(x: number): IExtensibleWithOrAnd<ILessTypes, INegativePositiveTypes>;
    hasLength(x: number): IExtensibleWithAnd<IStringArrayTypes>;
    in<T extends object>(x: T): IExtensibleWithOr<IStringTypes>;
    inheritance<T extends Function>(x: T): IExtensibleWithOptional;
    inRange(x: number, y: number): IExtensibleWithOptional;
    instance<T extends object>(x: T): IExtensibleWithOr<IObjectTypes>;
    instanceStrict<T extends object>(x: T): IExtensibleWithOr<IObjectTypes>;
    integer: IExtensibleWithAnd<IIntegerFloatTypes>;
    iterable: IExtensibleWithOptional;
    keyIn<T extends object>(x: T): IExtensibleWithOr<IStringTypes>;
    less(x: number): IExtensibleWithOrAnd<IGreaterTypes, INegativePositiveTypes>;
    lessOrEqual(x: number): IExtensibleWithOrAnd<IGreaterTypes, INegativePositiveTypes>;
    like<T extends object>(x: T): IExtensibleWithOr<IClassTypes>;
    match(x: RegExp): IExtensibleWithOptional;
    nan: IExtensibleWithOptional;
    negative: IExtensibleWithAnd<INegativePositiveTypes>;
    nonEmptyArray: IArray;
    nonEmptyObject: IExtensibleWithOr<IClassTypes>;
    nonEmptyString: IExtensibleWithOr<IEnumTypes>;
    null: ILoggable;
    number: IExtensibleWithOptional;
    object(x?: object): IExtensibleWithOr<IClassTypes>;
    odd: IExtensibleWithAnd<IOddEvenTypes>;
    positive: IExtensibleWithAnd<INegativePositiveTypes>;
    skip: ILoggable;
    string: IExtensibleWithOrAnd<IEnumTypes, IHasLengthType>;
    thenable: IExtensibleWithOptional;
    undefined: ILoggable;
}

export const Types: ITypes;
//#endregion

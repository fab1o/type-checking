// Type definitions for @fab1o/type-checking

//#region addType
interface MinTypeOptions {
    singular?: string;
    plural?: string;
    expectArgs?: boolean;
    stringify?: Function;
}

export function addType(name: string, validator: Function, options?: MinTypeOptions): void;
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

    let arrayOfMessage: string;
    let etceteraOn: boolean;
    let expectedMessage: string;
    let displayParamExt: boolean;
    let parentsOn: boolean;
    let receivedMessage: string;
    let withPropsMessage: string;
    let nameMethodPriority: Config.NameMethod;

    function reset(): void;
    function resetErrorType(): void;
    function setup(options?: IConfigOptions): void;
}

interface IConfigOptions {
    ErrorType?: Error | Function;
    etcetera?: boolean;
    parents?: boolean;
    displayParamExt?: boolean;
    expectedMessage?: string;
    receivedMessage?: string;
    withPropsMessage?: string;
    nameMethodPriority?: string;
}

//#endregion

//#region Types
interface IArray extends IExtensible {
    (a: any): void;
    of: ITypes;
}

interface IExtensible {
    optional: void;
    nullable: void;
    undefinable: void;
}

interface ITypes {
    array: IArray;
    assigned: IExtensible;
    between(x: number, y: number): IExtensible;
    boolean: IExtensible;
    custom(customValidator: Function, errorMessage?: String): IExtensible;
    date: IExtensible;
    dateString: IExtensible;
    emptyArray: IExtensible;
    emptyObject: IExtensible;
    emptyString: IExtensible;
    even: IExtensible;
    equal: IExtensible;
    float: IExtensible;
    function: IExtensible;
    greater(x: number): IExtensible;
    greaterOrEqual(x: number): IExtensible;
    in<T extends object>(x: T): IExtensible;
    inheritance<T extends Function>(x: T): IExtensible;
    inRange(x: number, y: number): IExtensible;
    instance<T extends object>(x: T): IExtensible;
    instanceStrict<T extends object>(x: T): IExtensible;
    integer: IExtensible;
    iterable: IExtensible;
    keyIn<T extends object>(x: T): IExtensible;
    less(x: number): IExtensible;
    lessOrEqual(x: number): IExtensible;
    like<T extends object>(x: T): IExtensible;
    match(x: RegExp): IExtensible;
    negative: IExtensible;
    nonEmptyArray: IExtensible;
    nonEmptyObject: IExtensible;
    nonEmptyString: IExtensible;
    null: IExtensible;
    number: IExtensible;
    object(x?: object): IExtensible;
    odd: IExtensible;
    positive: IExtensible;
    skip: void;
    string: IExtensible;
    thenable: IExtensible;
    undefined: IExtensible;
}

export const Types: ITypes;
//#endregion

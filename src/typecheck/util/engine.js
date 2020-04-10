import { assert } from 'check-types';

import { Config } from '../../config';
import { MethodSignature, MessageBuilder } from '../../messageBuilder';

import { getUserInputType, typecheckParams, UserInputTypes } from '../../util';

import { composeOverloading, isObjectTypes } from '.';

export function engine(isOneOfRequired, ...args) {
    const {
        signature,
        a: object,
        b: method,
        c: params,
        d: input,
        e: ErrorType = Config.Error
    } = composeOverloading(args);

    assert(
        isObjectTypes(params),
        `${signature} params ${Config.expectedMessage} an Object built with Types.`,
        Config.DefaultError
    );

    const inputType = getUserInputType(input);

    assert(
        inputType !== UserInputTypes.none,
        `${signature} arguments ${Config.expectedMessage} an Array or an Object. Make sure you configure params and invoke typecheck correctly.`,
        Config.DefaultError
    );

    const isBracketsForced = inputType === UserInputTypes.object;

    const methodSignature = new MethodSignature({
        object,
        method,
        params,
        isBracketsForced
    });

    const messageBuilder = new MessageBuilder(methodSignature);

    typecheckParams({ input, params, messageBuilder, ErrorType, isOneOfRequired });
}

// ***
// import Check from '@fab1o/check-types';

// import { Config } from '../config';
// import { buildReceivedMessage } from '../messageBuilder/buildReceivedMessage';
// import { Param } from '../messageBuilder/param';

// /**
//  * @param {Function} paramValidate
//  * @param {Object} options
//  * @param {TypeChecking.MessageBuilder.Param} options.param - Param.
//  * @param {TypeChecking.MessageBuilder.Param} [options.parent] - Parent Param.
//  * @param {String} [options.name=''] - Name of a Param.
//  * @param {String} [options.signature='typecheck(...)'] - Typecheker's function signature.
//  * @desc Verify whether type is a validate function.
//  * @throws {Error} When paramValidate is not a validate function.
//  * @returns {Boolean}
//  */
// export function verifyValidateFunction(paramValidate, options) { ***
//     const { param, parent, name = '', signature = 'typecheck(...)' } = options;

//     // paramValidate must have a typeName to be valid
//     if (Check.function(paramValidate) && Check.string(paramValidate.typeName)) {
//         return true;
//     }

//     // dev did not setup params correctly: param was not assigned a valid type
//     let paramName;

//     if (Check.instance(param, Param)) {
//         paramName = param;
//     } else {
//         const par = Check.instance(parent, Param) ? `${parent.name}.` : '';

//         paramName = `${par}${name}`;
//     }

//     const expected = `${Config.expectedMessage} a valid type of Types`;
//     const butReceived = buildReceivedMessage(paramValidate);

//     throw TypeError(`${signature} param ${paramName} ${expected} ${butReceived}.`);
// }

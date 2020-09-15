import { Config } from '../../index';

Config.NameMethod;

Config.setup({
    ErrorType: Error,
    nameMethodPriority: Config.NameMethod.name,
    parents: true
});

Config.receivedMessage = '';

Config.resetErrorType();
Config.reset();

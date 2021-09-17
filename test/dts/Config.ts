import { Config } from '../../index';

Config.nameMethodPriority = Config.NameMethod.name;

Config.setup({
    ErrorType: Error,
    nameMethodPriority: Config.NameMethod.toString
});

Config.loggerMethodForOrType = Config.LoggerMethod.info;

Config.loggerMethodForOrType = null;

Config.receivedMessage = '';

Config.parentsOn = true;

Config.resetErrorType();
Config.reset();

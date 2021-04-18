declare type CommandOptions = {
    name: string;
    aliases: string[];
    cooldown: string | number;
    category: string;
    cooldownMessage: string;
    minArgs: number;
    maxArgs: number;
    argsMessage: string;
    description: string;
    usage: string;
    example: string;
    dev: boolean;
    devMessage: string;
    nsfw: boolean;
    nsfwMessage: string;
    permissions: string[];
    permissionsMessage: string;
    botPermissions: string[];
    botPermissionsMessage: string;
    locked: boolean;
    lockedMessage: string;
    hidden: boolean;
    hidden2: boolean;
    fire: any;
    run: any;
    execute: any;
    callback: any;
};
interface Command {
    name: string;
    aliases: string[];
    cooldown: string | number;
    category: string;
    cooldownMessage: string;
    minArgs: number;
    maxArgs: number;
    argsMessage: string;
    description: string;
    usage: string;
    example: string;
    dev: boolean;
    devMessage: string;
    nsfw: boolean;
    nsfwMessage: string;
    permissions: string[];
    permissionsMessage: string;
    botPermissions: string[];
    botPermissionsMessage: string;
    locked: boolean;
    lockedMessage: string;
    hidden: boolean;
    hidden2: boolean;
    fire: any;
    run: any;
    execute: any;
    callback: any;
}
declare class Command {
    constructor({ name, aliases, cooldown, category, cooldownMessage, minArgs, maxArgs, argsMessage, description, usage, example, dev, devMessage, nsfw, nsfwMessage, permissions, permissionsMessage, botPermissions, botPermissionsMessage, locked, lockedMessage, hidden, hidden2, fire, run, execute, callback, }: CommandOptions);
}
export { CommandOptions };
export default Command;
//# sourceMappingURL=Command.d.ts.map
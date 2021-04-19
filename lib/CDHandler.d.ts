import { Client, Collection, Message } from "discord.js";
interface CDHandler {
    client: Client;
    commands: Collection<string, Record<string, any>>;
    aliases: Collection<string[], Record<string, any>>;
    prefixes: Collection<string, Record<string, any>>;
    categories: any;
    disabled: Collection<any, any>;
    pingReply: boolean;
    category: string;
    devs: string[];
    prefix: string;
    defaults: boolean;
    commandsDir: string | boolean;
    eventsDir: string | boolean;
    featuresDir: string | boolean;
    cd: any;
}
declare class CDHandler {
    constructor(client: Client, options?: any);
    cooldown(message: Message, timer: string | number): void;
}
export default CDHandler;
//# sourceMappingURL=CDHandler.d.ts.map
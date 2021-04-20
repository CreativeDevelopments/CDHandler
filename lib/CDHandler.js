"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var ms_1 = __importDefault(require("ms"));
var load_commands_1 = __importDefault(require("./load/load-commands"));
var load_features_1 = __importDefault(require("./load/load-features"));
var load_events_1 = __importDefault(require("./load/load-events"));
var message_1 = __importDefault(require("./events/message"));
var load_commands_2 = __importDefault(require("./defaults/load-commands"));
var cdcolours_1 = __importDefault(require("cdcolours"));
var slash_1 = __importDefault(require("./events/slash"));
;
var CDHandler = /** @class */ (function () {
    function CDHandler(client, options) {
        var _a;
        this._prefix = "!";
        this._warnings = false;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.prefixes = new discord_js_1.Collection();
        this.categories = new discord_js_1.Collection();
        this.slash = new discord_js_1.Collection();
        this.disabled = new discord_js_1.Collection();
        this.cd = new discord_js_1.Collection();
        this.client = client;
        this.pingReply = (options === null || options === void 0 ? void 0 : options.pingReply) === false ? options.pingReply : CDHandler._pingReply;
        this.category = (options === null || options === void 0 ? void 0 : options.category) ? options.category : CDHandler._category;
        this.devs = (_a = options === null || options === void 0 ? void 0 : options.devs) !== null && _a !== void 0 ? _a : [];
        if (options === null || options === void 0 ? void 0 : options.warnings)
            this._warnings = true;
        if (options === null || options === void 0 ? void 0 : options.prefix)
            this._prefix = options.prefix;
        this.defaults = (options === null || options === void 0 ? void 0 : options.defaults) ? options.defaults : CDHandler._defaults;
        if (this._warnings)
            console.log(cdcolours_1.default("[CDHandler] ", { textColour: "magenta" }) + " CoffeeScript support isn't stable.");
        if (options === null || options === void 0 ? void 0 : options.commandsDir) {
            load_commands_1.default((options.commandsDir || CDHandler._commandsDir), this.commands, this.aliases, this.categories, this.category, this.client, this.slash);
            message_1.default(this, this.client, this._prefix, this.pingReply, this.commands, this.aliases, this.prefixes, this.devs, this.cd);
            slash_1.default(this.slash, this.client);
        }
        ;
        if (this.defaults) {
            if (options === null || options === void 0 ? void 0 : options.commandsDir)
                load_commands_2.default(this.commands, this.aliases, this.categories, this.category);
        }
        ;
        if (options === null || options === void 0 ? void 0 : options.eventsDir) {
            load_events_1.default(this.client, (options.eventsDir || CDHandler._eventsDir));
        }
        ;
        if (options === null || options === void 0 ? void 0 : options.featuresDir) {
            load_features_1.default(this.client, (options.featuresDir || CDHandler._featuresDir));
        }
        ;
    }
    ;
    CDHandler.prototype.cooldown = function (message, timer) {
        var _a, _b, _c, _d;
        var time;
        if (typeof timer == 'string')
            time = ms_1.default(timer);
        else
            time = timer * 1000;
        var prefix = this.prefix;
        prefix = (_b = (_a = this.prefixes.get(message.guild.id)) !== null && _a !== void 0 ? _a : prefix) !== null && _b !== void 0 ? _b : null;
        if (!prefix || prefix == null)
            prefix = this.prefix;
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var cmdName = args.shift();
        // @ts-ignore
        var cmd = (_d = (_c = this.commands.get(cmdName.toLowerCase())) !== null && _c !== void 0 ? _c : this.commands.get(this.aliases.get(cmdName.toLowerCase()))) !== null && _d !== void 0 ? _d : null;
        if (cmd == null)
            return;
        var name = cmd.name;
        this.cd.set(name + message.guild.id + message.author.id, Date.now() + time);
    };
    ;
    CDHandler._pingReply = true;
    CDHandler._defaults = true;
    CDHandler._category = "Misc";
    CDHandler._commandsDir = "commands";
    CDHandler._eventsDir = "events";
    CDHandler._featuresDir = "features";
    return CDHandler;
}());
;
exports.default = CDHandler;
//# sourceMappingURL=CDHandler.js.map
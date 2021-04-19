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
var message_1 = __importDefault(require("./message/message"));
var load_commands_2 = __importDefault(require("./defaults/load-commands"));
;
var CDHandler = /** @class */ (function () {
    function CDHandler(client, options) {
        if (options === void 0) { options = { commandsDir: false, eventsDir: false, featuresDir: false, defaults: true, prefix: "!", category: "Misc", pingReply: true, devs: [] }; }
        var _a, _b, _c, _d, _e;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.prefixes = new discord_js_1.Collection();
        this.categories = new discord_js_1.Collection();
        this.disabled = new discord_js_1.Collection();
        this.cd = new discord_js_1.Collection();
        this.client = client;
        this.pingReply = (_a = options.pingReply) !== null && _a !== void 0 ? _a : true;
        this.category = (_b = options.category) !== null && _b !== void 0 ? _b : "Misc";
        this.devs = (_c = options.devs) !== null && _c !== void 0 ? _c : [];
        this.prefix = (_d = options.prefix) !== null && _d !== void 0 ? _d : "!";
        this.defaults = (_e = options.defaults) !== null && _e !== void 0 ? _e : true;
        if (options.commandsDir) {
            load_commands_1.default((options.commandsDir || 'commands'), this.commands, this.aliases, this.categories, this.category);
            message_1.default(this, this.client, this.prefix, this.pingReply, this.commands, this.aliases, this.prefixes, this.devs, this.cd);
        }
        if (this.defaults) {
            if (options.commandsDir)
                load_commands_2.default(this.commands, this.aliases, this.categories, this.category);
        }
        if (options.eventsDir) {
            load_events_1.default(this.client, (options.eventsDir || 'events'));
        }
        if (options.featuresDir) {
            load_features_1.default(this.client, (options.featuresDir || 'features'));
        }
    }
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
    return CDHandler;
}());
exports.default = CDHandler;
//# sourceMappingURL=CDHandler.js.map
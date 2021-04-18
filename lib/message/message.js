"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cdcolours_1 = __importDefault(require("cdcolours"));
var ms_1 = __importDefault(require("ms"));
var discord_js_1 = require("discord.js");
var lockedEmbed = new discord_js_1.MessageEmbed()
    .setTitle('🔒 Command Locked')
    .setDescription("You can't use this command now, please try again later");
exports.default = (function (handler, client, defaultPrefix, ping, commands, aliases, prefixes, devs, cd) {
    client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var prefix, author, member, content, guild;
        return __generator(this, function (_a) {
            prefix = [];
            if (typeof defaultPrefix == 'string')
                prefix.push(defaultPrefix);
            else
                prefix = prefix.concat(defaultPrefix);
            if (message.author.bot || message.channel.type == 'dm')
                return [2 /*return*/];
            author = message.author, member = message.member, content = message.content, guild = message.guild;
            if (!author || !member || !content || !guild)
                return [2 /*return*/];
            prefix = prefixes.get(message.guild.id) || prefix || null;
            if (prefix == null)
                return [2 /*return*/];
            if (typeof prefix == 'string')
                prefix = [prefix];
            if (message.content.trim() == "<@!" + client.user.id + ">" && ping) {
                if (typeof prefix == 'string' || !prefix[1])
                    return [2 /*return*/, message.channel.send("My prefix for **" + message.guild.name + "** is `" + (typeof prefix == 'string' ? prefix : prefix.join(' ')) + "`")];
                else
                    return [2 /*return*/, message.channel.send("My prefixes for **" + message.guild.name + "** are `" + prefix.join('\`, \`') + "`")];
            }
            prefix.forEach(function (p) {
                var _a;
                if (!message.content.startsWith(p))
                    return;
                if (message.channel.type == 'dm')
                    return false;
                var args = message.content.slice(p.length).trim().split(/ +/g);
                var cmdName = args.shift();
                var command = "" + p.toLowerCase() + (cmdName === null || cmdName === void 0 ? void 0 : cmdName.toLowerCase());
                // @ts-ignore
                var cmd = commands.get(cmdName.toLowerCase()) || commands.get(aliases.get(cmdName.toLowerCase())) || null;
                if (cmd) {
                    if (content.toLowerCase().startsWith(command + " ") || content.toLowerCase() === command) {
                        var cooldownMessage = cmd.cooldownMessage, _b = cmd.dev, dev = _b === void 0 ? false : _b, devMessage = cmd.devMessage, _c = cmd.locked, locked = _c === void 0 ? false : _c, _d = cmd.lockedMessage, lockedMessage = _d === void 0 ? lockedEmbed : _d, _e = cmd.nsfw, nsfw = _e === void 0 ? false : _e, _f = cmd.nsfwMessage, nsfwMessage = _f === void 0 ? "Run this command in a SFW channel!" : _f, permissions = cmd.permissions, _g = cmd.permissionsMessage, permissionsMessage = _g === void 0 ? "You don't have permissions to execute this command" : _g, _h = cmd.minArgs, minArgs = _h === void 0 ? -1 : _h, _j = cmd.maxArgs, maxArgs = _j === void 0 ? null : _j, _k = cmd.argsMessage, argsMessage = _k === void 0 ? "Incorrect usage!" : _k, botPermissions = cmd.botPermissions, _l = cmd.botPermissionsMessage, botPermissionsMessage = _l === void 0 ? "Make sure to give me permissions before executing this command" : _l, fire = cmd.fire, callback = cmd.callback, run = cmd.run, execute = cmd.execute;
                        if (locked) {
                            if (lockedMessage) {
                                message.channel.send(lockedMessage);
                                return;
                            }
                            else
                                return;
                            return;
                        }
                        if (dev && devs.length && !devs.includes(message.author.id)) {
                            if (devMessage) {
                                message.channel.send(devMessage);
                                return;
                            }
                            else
                                return;
                            return;
                        }
                        if (nsfw && !message.channel.nsfw) {
                            if (nsfwMessage) {
                                message.channel.send(nsfwMessage);
                                return;
                            }
                            else
                                return;
                            return;
                        }
                        var cooldown = (_a = cd.get(cmd.name + message.guild.id + message.author.id)) !== null && _a !== void 0 ? _a : null;
                        if (cooldown && (Number(cooldown) > Date.now())) {
                            var remaining = Number(cooldown) - Date.now();
                            remaining.toFixed(2);
                            if (remaining > 0) {
                                if (cooldownMessage) {
                                    message.channel.send(cooldownMessage.replace('{REMAINING}', ms_1.default(remaining)));
                                    return;
                                }
                                else {
                                    var cooldownEmbed = new discord_js_1.MessageEmbed()
                                        .setTitle("⏲️ Calm down you're in a cooldown!")
                                        .setDescription("Wait " + remaining + " more to execute this command again");
                                    return message.channel.send(cooldownEmbed);
                                }
                            }
                        }
                        if (permissions && permissions.length && !message.member.permissions.has(permissions)) {
                            if (permissionsMessage) {
                                message.channel.send(permissionsMessage);
                                return;
                            }
                            else
                                return;
                        }
                        if (!message.channel.permissionsFor(client.user.id).has(botPermissions)) {
                            if (botPermissionsMessage) {
                                message.channel.send(botPermissionsMessage);
                                return;
                            }
                            else
                                return;
                        }
                        if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                            message.channel.send(argsMessage);
                            return;
                        }
                        if (fire) {
                            fire({ message: message, args: args, client: client, handler: handler });
                            return;
                        }
                        else if (callback) {
                            callback({ message: message, args: args, client: client, handler: handler });
                            return;
                        }
                        else if (run) {
                            run({ message: message, args: args, client: client, handler: handler });
                            return;
                        }
                        else if (execute) {
                            execute({ message: message, args: args, client: client, handler: handler });
                            return;
                        }
                        else {
                            throw new Error(cdcolours_1.default("[CDHANDLER] [ERROR]", { textColour: "red" }) + " Missing run function in " + cmd.name);
                        }
                    }
                    else
                        return false;
                }
                return false;
            });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=message.js.map
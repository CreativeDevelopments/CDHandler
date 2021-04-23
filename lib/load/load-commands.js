"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var loader_1 = __importDefault(require("./loader"));
var cdcolours_1 = __importDefault(require("cdcolours"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var register = function (dir, Fcommands, Faliases, Fcategories, Fcategory, client, Fslash) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        loader_1.default(dir, function (_a) {
            var path = _a.path, name = _a.name, ext = _a.ext, filename = _a.filename;
            return __awaiter(void 0, void 0, void 0, function () {
                var cmd_1, _i, _b, command, category, categoryGetter, slashes, slashCommand, _c, _d, server, sls, sl, category, categoryGetter, urls_2, json, _e, urls_1, url, response, Responser, cmdJson;
                var _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            if (filename.endsWith('.d.ts'))
                                return [2 /*return*/];
                            if (!(filename.endsWith(".ts") || ext in require.extensions)) return [3 /*break*/, 18];
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(path)); })];
                        case 1:
                            cmd_1 = (_k.sent()).default;
                            if (!cmd_1.name)
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without name");
                            if (!cmd_1.fire && !cmd_1.callback && !cmd_1.run && !cmd_1.execute)
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function");
                            if (!(!cmd_1.slash && cmd_1.slash !== false)) return [3 /*break*/, 2];
                            Fcommands.set(cmd_1.name.toLowerCase(), cmd_1);
                            console.log(cdcolours_1.default("[CDHandler]", { textColour: "blue" }) + " Loading command " + cmd_1.name);
                            if (cmd_1.aliases) {
                                for (_i = 0, _b = cmd_1.aliases; _i < _b.length; _i++) {
                                    command = _b[_i];
                                    Faliases.set(command.toLowerCase(), cmd_1.name);
                                }
                                category = cmd_1.category || Fcategory || "Misc";
                                categoryGetter = Fcategories.get(category.toLowerCase());
                                if (!categoryGetter)
                                    categoryGetter = [category];
                                categoryGetter.push(cmd_1.name);
                                Fcategories.set(category.toLowerCase(), categoryGetter);
                            }
                            return [3 /*break*/, 18];
                        case 2:
                            if (!(cmd_1.slash === false)) return [3 /*break*/, 13];
                            if (!(!cmd_1.servers || !cmd_1.servers[0])) return [3 /*break*/, 7];
                            return [4 /*yield*/, client.api.applications((_f = client.user) === null || _f === void 0 ? void 0 : _f.id).commands.get().catch(function (err) { return console.error(err); })];
                        case 3:
                            slashes = _k.sent();
                            slashCommand = (_g = slashes.find(function (s) { return s.name.toLowerCase() == cmd_1.name.toLowerCase(); })) !== null && _g !== void 0 ? _g : null;
                            if (!(slashCommand == null)) return [3 /*break*/, 4];
                            return [2 /*return*/];
                        case 4: return [4 /*yield*/, node_fetch_1.default("https://discord.com/api/v8/applications/" + client.user.id + "/commands/" + slashCommand.id, {
                                method: 'delete',
                                headers: {
                                    'Authorization': 'Bot ' + client.token,
                                    'Content-Type': 'application/json'
                                }
                            }).catch(function (err) { return console.error(err); })];
                        case 5:
                            _k.sent();
                            console.log(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Deleting global slash command " + cmd_1.name);
                            _k.label = 6;
                        case 6: return [3 /*break*/, 12];
                        case 7:
                            _c = 0, _d = cmd_1.servers;
                            _k.label = 8;
                        case 8:
                            if (!(_c < _d.length)) return [3 /*break*/, 12];
                            server = _d[_c];
                            return [4 /*yield*/, client.api.applications((_h = client.user) === null || _h === void 0 ? void 0 : _h.id).guilds(server).commands.get().catch(function (err) { return console.error(err); })];
                        case 9:
                            sls = _k.sent();
                            sl = sls.find(function (s) { return s.name.toLowerCase() == cmd_1.name.toLowerCase(); });
                            if (typeof sl == 'undefined')
                                return [3 /*break*/, 11];
                            return [4 /*yield*/, node_fetch_1.default("https://discord.com/api/v8/applications/" + client.user.id + "/guilds/" + server + "/commands/" + sl.id, {
                                    method: 'delete',
                                    headers: {
                                        'Authorization': 'Bot ' + client.token,
                                        'Content-Type': 'application/json'
                                    }
                                }).catch(function (err) { return console.error(err); })];
                        case 10:
                            _k.sent();
                            console.log(cdcolours_1.default("[CDHandler]", { textColour: "red" }) + " Deleting slash command " + cmd_1.name);
                            _k.label = 11;
                        case 11:
                            _c++;
                            return [3 /*break*/, 8];
                        case 12: return [3 /*break*/, 18];
                        case 13:
                            if (!cmd_1.run && !cmd_1.execute && !cmd_1.fire && !cmd_1.callback)
                                throw new Error(cdcolours_1.default("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function");
                            console.log(cdcolours_1.default("[CDHandler]", { textColour: "blue" }) + " Loading slash command " + cmd_1.name);
                            category = cmd_1.category || Fcategory || "Misc";
                            categoryGetter = Fcategories.get(category.toLowerCase());
                            if (!categoryGetter)
                                categoryGetter = [category];
                            categoryGetter.push(cmd_1.name);
                            Fcategories.set(category.toLowerCase(), categoryGetter);
                            urls_2 = [];
                            if (cmd_1.servers && cmd_1.servers[0])
                                cmd_1.servers.forEach(function (server) { return urls_2.push("https://discord.com/api/v8/applications/" + client.user.id + "/guilds/" + server + "/commands"); });
                            else
                                urls_2.push("https://discord.com/api/v8/applications/" + client.user.id + "/commands");
                            json = {
                                name: cmd_1.name,
                                description: (_j = cmd_1.description) !== null && _j !== void 0 ? _j : "No description",
                                "options": cmd_1.data
                            };
                            _e = 0, urls_1 = urls_2;
                            _k.label = 14;
                        case 14:
                            if (!(_e < urls_1.length)) return [3 /*break*/, 18];
                            url = urls_1[_e];
                            return [4 /*yield*/, node_fetch_1.default(url, {
                                    method: 'post',
                                    body: JSON.stringify(json),
                                    headers: {
                                        'Authorization': 'Bot ' + client.token,
                                        'Content-Type': 'application/json'
                                    }
                                })];
                        case 15:
                            response = _k.sent();
                            return [4 /*yield*/, response.json()];
                        case 16:
                            Responser = _k.sent();
                            cmdJson = {
                                type: cmd_1.type || 4,
                                run: cmd_1.run || cmd_1.fire || cmd_1.execute || cmd_1.callback || null
                            };
                            Fslash.set(Responser.id, cmdJson);
                            Fcommands.set(cmd_1.name.toLowerCase(), cmd_1);
                            _k.label = 17;
                        case 17:
                            _e++;
                            return [3 /*break*/, 14];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        });
        return [2 /*return*/];
    });
}); };
exports.default = register;
//# sourceMappingURL=load-commands.js.map
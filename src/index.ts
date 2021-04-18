import { Client, Collection, Message } from "discord.js";
import ms from "ms";
import loading from './handlers/load-commands';
import features from './handlers/load-features';
import events from './handlers/load-events';
import fireMessage from './message/message';
import loadDefaultCommands from './defaults/load-commands';
import Command, { CommandOptions } from "./Command";

require("./coffee")()

interface CDHandler {
client: Client,
commands: Collection<string, Record<string, any>>;
aliases: Collection<string[], Record<string, any>>;
prefixes: Collection<string, Record<string, any>>;
categories: any;
disabled: Collection<any, any>
pingReply: boolean,
category: string,
devs: string[],
prefix: string,
defaults: boolean
commandsDir: string | boolean
eventsDir: string | boolean
featuresDir: string | boolean
cd: any,
};


class CDHandler {
 
      constructor(client: Client, options: any = { commandsDir: false, eventsDir: false, featuresDir: false, defaults: true, prefix: "!", category: "Misc", pingReply: true, devs: []}) {

      this.commands = new Collection();
      this.aliases = new Collection();
      this.prefixes = new Collection();
      this.categories = new Collection();
      this.disabled = new Collection();
      this.cd = new Collection();
      this.client = client;
      this.pingReply = options.pingReply ?? true;
      this.category = options.category ?? "Misc";
      this.devs = options.devs ?? [];
      this.prefix = options.prefix ?? "!";
      this.defaults = options.defaults ?? true;

      if (options.commandsDir) {
        loading((options.commandsDir || 'commands'), this.commands, this.aliases, this.categories, this.category);
        fireMessage(this, this.client, this.prefix, this.pingReply, this.commands, this.aliases, this.prefixes, this.devs, this.cd);
      }

      if (this.defaults) { 
        if (options.commandsDir) loadDefaultCommands(this.commands, this.aliases, this.categories, this.category);
      }

      if (options.eventsDir) {
        events(this.client, (options.eventsDir || 'events'));
      }

      if (options.featuresDir) {
        features(this.client, (options.featuresDir || 'features'));
      }
    }

    cooldown(message: Message, timer: string | number) {
      let time;

        if (typeof timer == 'string')
          time = ms(timer);
        else time = timer * 1000;
    
        let prefix: any = this.prefix
        prefix = this.prefixes.get(message.guild!.id) ?? prefix ?? null;
        if (!prefix || prefix == null) prefix = this.prefix;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift();
        // @ts-ignore
        const cmd = this.commands.get(cmdName.toLowerCase()) ?? this.commands.get(this.aliases.get(cmdName.toLowerCase())) ?? null;
        if (cmd == null) return;

        const name = cmd.name;

        this.cd.set(name + message.guild!.id + message.author!.id, Date.now() + time);
    }
}



export { Command, CDHandler }
export type { CommandOptions }
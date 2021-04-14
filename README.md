<div style="text-align:center">
<a href="https://nodei.co/npm/cdhandler/"><img src="https://nodei.co/npm/cdhandler.png"></a>

<br>
<br>

<a href="https://www.npmjs.com/package/cdhandler"><img src="https://img.shields.io/npm/dt/cdhandler.svg"></a>
<a href="https://www.npmjs.com/package/cdhandler"><img src="https://img.shields.io/npm/dm/cdhandler.svg?style=color=blue"></a>
<a href="https://www.npmjs.com/package/cdhandler"><img src="https://img.shields.io/npm/v/cdhandler.svg?style=color=blue"></a>

</div>

<br>

# Contents

- [Installation](#installation)
- [Setup](#setup)
- [Creating a Command](#creating-a-command)
  - [Command Options](#properties)
  - [Command](#command)
  - [Intellisense](#Intellisense)
- [Creating an Event](#creating-an-event)
- [Support and Other](#support-and-other)

<br>

# Installation

```
npm i cdhandler --save
npm i cdcolours --save // This is optional, we use this for colourful console logs
```

<br>

# Setup

JavaScript

```js
// File Name (Main File) - index.js

const colour = require("cdcolours");
const Discord = require("discord.js");
const { CDHandler } = require("cdhandler");

const client = new Discord.Client();

client.on("ready", () => {
  new CDHandler(client, {
    commandsDir: "commands", // String - commands directory
    eventsDir: "events", // String - events directory
    featuresDir: "features", // String - features directory
    prefix: "!",
    category: "Misc", // String - Default category for commands
    pingReply: true, // Boolean - If you want the bot to reply with it's prefix when it gets pinged
    devs: [], // Array - Bot Developer ID's for devOnly commands.
    defaults: true, // Boolean - active default commands
  });

  console.log(
    colour("[READY]", { textColour: "green" }) +
      ` Successfully logged in as ${client.user.tag}`,
  );
});

client.login("BOT_TOKEN");
```

TypeScript

```ts
// File Name (Main File) - index.ts

import colour from "cdcolours";
import * as Discord from "discord.js";
import { CDHandler } from "cdhandler";
import { config as dotenv } from "dotenv";
dotenv();

const client = new Discord.Client();

client.on("ready", () => {
  new CDHandler(client, {
    commandsDir: "commands", // String - commands directory
    eventsDir: "events", // String - events directory
    featuresDir: "features", // String - features directory
    prefix: "!",
    category: "Misc", // String - Default category for commands
    pingReply: true, // Boolean - If you want the bot to reply with it's prefix when it gets pinged
    devs: [], // Array - Bot Developer ID's for devOnly commands.
    defaults: true, // Boolean - active default commands
  });

  console.log(
    colour("[READY]", { textColour: "green" }) +
      ` Successfully logged in as ${client.user!.tag}`,
  );
});

client.login("BOT_TOKEN");
```

<br>

# Creating a Command

All your command files need to be inside your commands directory. You can have as many sub directories as you want.

## Options

```
name* -- String | The name of the command

aliases - Array | An array of aliases for the command
cooldown - String | Cooldown JUST TO DISPLAY IN HELP MENU
cooldownMessage - String | The response message if the cooldown timeout didn't expired

minArgs - Number | The minimum arguments required for a command
maxArgs - Number | The maximum arguments for a command
argsMessage - String | The response for if a user has too many or not enough arguments for a command

description - String | The command description
usage - String | The command usage
example - String | A example

dev - Boolean | If the command should be locked to developers only (Defined in the main file)
devMessage - String | The response message for if a non-dev runs a developer only command

nsfw - Boolean | If the command should be locked to SFW channels
nsfwMessage - String | The response message for if a user runs a NSFW command in a SFW channel

permissions - Array | Permissions the user needs to run the command
permissionsMessage - String | The response message for if a user does not have all the required permissions

botPermissions - Array | Permissions the bot requires to run the command
botPermissionsMessage - String | The response message for if the bot does not have the requried permissions to run a command

category - String | The category the command is in

locked - Boolean | Locks the command (default: false)
lockedMessage - String | The response message for a locked command

hidden - Boolean | Makes the command completely invisible for help command (default: false)
hidden2 - Boolean | Makes the command partially invisible for help command (default: false)
```

## Command

JavaScript

```js
// File Name - ping.js

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["Pong"],
  description: "Replies with Pong!",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more to execute this command again!",
  //usage: "", it's not needed on this command
  //example: "", it's not needed on this command
  minArgs: 0,
  maxArgs: 0,
  argsMessage:
    "Incorrect Arguments! There are no arguments required for this command!",
  dev: true,
  devMessage: "You must be a developer to run this command!",
  nsfw: true,
  nsfwMessage: "You cannot run this command in SFW channels!",
  permissions: ["KICK_MEMBERS"],
  permissionsMessage:
    "You must have the 'Kick Members' permission to run this command!",
  botPermissions: ["EMBED_LINKS"],
  botPermissionsMessage:
    "I cannot run this command without the 'Embed Links' permission!",
  category: "Misc",
  locked: true,
  lockedMessage: "This command is locked at the moment!",
  hidden: true,
  hidden2: true,
  run: ({ message, args, client, handler }) => {
    /* handler represents fireHandler but don't change the param name you can use callback, execute or fire instead of run */
    const embed = new MessageEmbed().setColor("#00DCFF").setTitle("Pong!");

    message.channel.send(embed);

    handler.cooldown(message, "5s"); // this creates a cooldown
  },
};
```

TypeScript

```ts
// File Name - ping.ts

import { MessageEmbed } from "discord.js";

export default {
  name: "ping",
  aliases: ["Pong"],
  description: "Replies with Pong!",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more to execute this command again!",
  //usage: "", it's not needed on this command
  //example: "", it's not needed on this command
  minArgs: 0,
  maxArgs: 0,
  argsMessage:
    "Incorrect Arguments! There are no arguments required for this command!",
  dev: true,
  devMessage: "You must be a developer to run this command!",
  nsfw: true,
  nsfwMessage: "You cannot run this command in SFW channels!",
  permissions: ["KICK_MEMBERS"],
  permissionsMessage:
    "You must have the 'Kick Members' permission to run this command!",
  botPermissions: ["EMBED_LINKS"],
  botPermissionsMessage:
    "I cannot run this command without the 'Embed Links' permission!",
  category: "Misc",
  locked: true,
  lockedMessage: "This command is locked at the moment!",
  hidden: true,
  hidden2: true,
  run: ({ message, args, client, handler }: any) => {
    /* handler represents fireHandler but don't change the param name
     you can use callback, execute or fire instead of run */
    const embed = new MessageEmbed().setColor("#00DCFF").setTitle("Pong!");

    message.channel.send(embed);

    handler.cooldown(message, "5s"); // this creates a cooldown
  },
};
```

<br>

# Intellisense

<h2>How to add Intellisense?</h2>

JavaScript:

```js
// File Name - ping.js

const { MessageEmbed } = require("discord.js");
const { Command } = require("cdhandler"); // <--

module.exports = new Command({
  // <--
  name: "ping",
  aliases: ["Pong"],
  description: "Replies with Pong!",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more to execute this command again!",
  //usage: "", it's not needed on this command
  //example: "", it's not needed on this command
  minArgs: 0,
  maxArgs: 0,
  argsMessage:
    "Incorrect Arguments! There are no arguments required for this command!",
  dev: true,
  devMessage: "You must be a developer to run this command!",
  nsfw: true,
  nsfwMessage: "You cannot run this command in SFW channels!",
  permissions: ["KICK_MEMBERS"],
  permissionsMessage:
    "You must have the 'Kick Members' permission to run this command!",
  botPermissions: ["EMBED_LINKS"],
  botPermissionsMessage:
    "I cannot run this command without the 'Embed Links' permission!",
  category: "Misc",
  locked: true,
  lockedMessage: "This command is locked at the moment!",
  hidden: true,
  hidden2: true,
  run: ({ message, args, client, handler }) => {

    const embed = new MessageEmbed()
    .setColor("#00DCFF")
    .setTitle("Pong!");

    message.channel.send(embed);

    handler.cooldown(message, "5s"); // this creates a cooldown
  },
}); // <--
```

TypeScript

```ts
// File Name - ping.ts

import { MessageEmbed } from "discord.js";
import { Command, CommandOptions } from "cdhandler"; // <--

export default new Command({
  // <--
  name: "ping",
  aliases: ["Pong"],
  description: "Replies with Pong!",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more to execute this command again!",
  //usage: "", it's not needed on this command
  //example: "", it's not needed on this command
  minArgs: 0,
  maxArgs: 0,
  argsMessage:
    "Incorrect Arguments! There are no arguments required for this command!",
  dev: true,
  devMessage: "You must be a developer to run this command!",
  nsfw: true,
  nsfwMessage: "You cannot run this command in SFW channels!",
  permissions: ["KICK_MEMBERS"],
  permissionsMessage:
    "You must have the 'Kick Members' permission to run this command!",
  botPermissions: ["EMBED_LINKS"],
  botPermissionsMessage:
    "I cannot run this command without the 'Embed Links' permission!",
  category: "Misc",
  locked: true,
  lockedMessage: "This command is locked at the moment!",
  hidden: true,
  hidden2: true,
  run: ({ message, args, client, handler }: any) => {
    
    const embed = new MessageEmbed()
    .setColor("#00DCFF")
    .setTitle("Pong!");

    message.channel.send(embed);

    handler.cooldown(message, "5s"); // this creates a cooldown
  },
} as CommandOptions); // <--
```

<br>

# Creating an Event

When create an event, the file name needs to be whatever event you want. For example, if you want the `messageDelete` event your file would be called `messageDelete.js`.

JavaScript

```js
// file name = guildMemberRemove.js

module.exports = (client, member) => {
  // member is the guildMemberRemove param

  console.log(member.user.tag);
};
```

TypeScript

```ts
// file name = guildMemberRemove.ts

import { Client } from "discord.js";

export default (client: Client, member: any) => {
  // member is the guildMemberRemove param

  console.log(member.user!.tag);
};
```

<br>

# Creating a feature

JavaScript

```js
// Imagine you need 2 guildMemberRemove events

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    console.log(member.user.tag);
  });
};
```

Typescript

```ts
// Imagine you need 2 guildMemberRemove events

import { Client } from "discord.js";

export default (client: Client) => {
  /* you can import Client from
discord.js and change the any type to Client */

  client.on("guildMemberRemove", (member: any) => {
    console.log(member.user!.tag);
  });
};
```

<br>

# Prefixes

## How to add a prefix?

handler.prefixes.set('guild id', 'new prefix')

Note: Prefixes are local host, if you have a db make sure to store them in the db and in a loop get all the prefixes and store them in fireHandler.prefixes.set()

<br>

## How to get a prefix?

handler.prefixes.get('guild id') || handler.prefix

<br>

# Support and Other

If you need any help or have any suggestions for the package please join our [Support Server](https://discord.gg/jUNbV5u)

This package uses [CDColours](https://npmjs.com/cdcolours) for the console logs!

<br>

## Special thanks to:

- [CDCommands](https://npmjs.com/package/cdcommands)

- Exxon#0293

- That Duck Max#6669

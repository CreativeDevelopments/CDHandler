import colour from "cdcolours";
import ms from "ms";
import { Client, Collection, MessageEmbed } from "discord.js";

const lockedEmbed = new MessageEmbed()
.setTitle('🔒 Command Locked')
.setDescription("You can't use this command now, please try again later")

export default (handler: any, client: Client, defaultPrefix: string, ping: boolean, commands: Collection<string, Record<string, any>>, aliases: Collection<string[], Record<string, any>>, prefixes: Collection<string, Record<string, any>>, devs: string[], cd: any) => {
    client.on('message', async message => {

        let prefix: any = defaultPrefix;

        if (message.author.bot || message.channel.type == 'dm') return;
        const { author, member, content, guild } = message

        if (!author || !member || !content || !guild) return;

        prefix = prefixes.get(message.guild!.id) || prefix || null;

        if (!message.content.startsWith(prefix)) {
            if(message.content.trim() == `<@!${client.user!.id}>` && ping) {
        
                let guildPrefix: any = prefixes.get(message.guild!.id) || null;
                if (guildPrefix == null) guildPrefix = defaultPrefix;
        
              return message.channel.send(`My prefix for ${message.guild!.name} is \`${guildPrefix}\``)
            } else return false;
          }

        prefix = prefixes.get(message.guild!.id) || null;
        if (!prefix || prefix == null) prefix = defaultPrefix;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdName = args.shift();
        const command = `${prefix}${cmdName?.toLowerCase()}`;

        // @ts-ignore
        const cmd = commands.get(cmdName.toLowerCase()) || commands.get(aliases.get(cmdName.toLowerCase())) || null
        if (cmd == null) return;

        if (content.toLowerCase().startsWith(`${command} `) || content.toLowerCase() === command) {


        const {
            cooldownMessage,
            dev = false,
            devMessage,
            locked = false,
            lockedMessage = lockedEmbed,
            nsfw = false,
            nsfwMessage,
            permissions,
            permissionsMessage,
            minArgs = -1,
            maxArgs = null,
            argsMessage,
            botPermissions,
            botPermissionsMessage,
            fire,
            callback,
            run,
            execute
           } = cmd

           if (locked) {
               if (lockedMessage) {
                   message.channel.send(lockedMessage)
                   return;
                } else return;
               return;
           }

           if (dev && devs.length && !devs.includes(message.author.id)) {
              if (devMessage) {
                  message.channel.send(devMessage)
                  return;
              } else return;
              return;
           }

           if (nsfw && !message.channel.nsfw) {
            if (nsfwMessage) {
                message.channel.send(nsfwMessage)
                return;
            } else return;
            return;
         }

         const cooldown = cd.get(cmd.name + message.guild!.id + message.author!.id) ?? null
           if (cooldown && (Number(cooldown) > Date.now())) {
               const remaining: number = Number(cooldown) - Date.now()
               remaining.toFixed(2)
               if (remaining > 0) {
                   if (cooldownMessage) {
                       message.channel.send(cooldownMessage.replace('{REMAINING}', ms(remaining)))
                       return;
                   } else return;
               }
           }

         if (permissions && permissions.length && !message.member!.permissions.has(permissions)) {
             if (permissionsMessage) {
                 message.channel.send(permissionsMessage)
                 return;
             } else return;
         }

         if (!message.channel.permissionsFor(client.user!.id)!.has(botPermissions)) {
            if (botPermissionsMessage) {
                message.channel.send(botPermissionsMessage)
                return;
            } else return;
        }

         if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
             message.channel.send(argsMessage)
             return;
         }        


         if (fire) {
           fire({ message, args, client, handler })
           return;
         } else if (callback) {
            callback({ message, args, client, handler })
            return;
         } else if (run) {
            run({ message, args, client, handler })
            return;
         }  else if (execute) {
            execute({ message, args, client, handler })
            return;
         } else {
             throw new Error(colour("[FIRE-HANDLER] [ERROR]", { textColour: "red" }) + " Missing fire function in " + cmd.name);
         }
      

    } else return;
})
}
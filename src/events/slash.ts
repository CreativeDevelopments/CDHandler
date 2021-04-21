import { APIMessage, APIMessageContentResolvable, Collection, Client, MessageTarget } from "discord.js"

export default (map: Collection<string, Record<string, any>>, client: Client, handler: any) => {

    client.ws.on('INTERACTION_CREATE' as any, async interaction => {

        let send = {
          content: "ERROR"
        } as any

        let number;
        let guild = client.guilds.cache.get(interaction.guild_id) || await client.guilds.fetch(interaction.guild_id)
        let member = guild.members.cache.get(interaction.member.user.id) || await guild.members.fetch(interaction.member.user.id)
        let user = member.user
        let channel = client.channels.cache.get(interaction.channel_id) || await client.channels.fetch(interaction.channel_id)

        const cmd = map.get(interaction.data.id) ?? null
        if (cmd == null) {
           send.content = 'ERROR'
           number = 4
        }
        else { 
            number = cmd.type ? cmd.type : 4
            send.content = await cmd!.run({ interaction, guild, channel, member, user, handler })

            if (typeof send == "object") {
              // @ts-ignore
              send.content = (await createAPIMessage(client, interaction, send)).content
              
              console.log(send, "\n\n\n\n\n\n\n\n\n");
              console.log(send[0])
            }
        }
        
        // @ts-ignore
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
          type: number,
          data: send
          }
        })
      })
}

const createAPIMessage = async (client: Client, interaction: any, content: APIMessageContentResolvable) => {
  const { data, files } = await APIMessage.create(
    client.channels.resolve(interaction.channel_id) as MessageTarget,
    content
  )
    .resolveData()
    .resolveFiles();

  return { ...data, files };
};
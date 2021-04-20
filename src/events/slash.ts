import { Collection, Client } from "discord.js"

export default (map: Collection<string, Record<string, any>>, client: Client) => {

    client.ws.on('INTERACTION_CREATE' as any, async interaction => {

        let send;
        let guild = client.guilds.cache.get(interaction.guild_id) || await client.guilds.fetch(interaction.guild_id)
        let member = guild.members.cache.get(interaction.user_id) || await guild.members.fetch(interaction.user_id)
        let user = member.user
        let channel = client.channels.cache.get(interaction.channel_id) || await client.channels.fetch(interaction.channel_id)
       

        console.log(interaction)
        const cmd = map.get(interaction.id) ?? null
        if (cmd == null) send = 'ERROR'
        else send = cmd!.run({ interaction, guild, channel, member, user })
       
        // @ts-ignore
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
          type: cmd!.type,
          data: {
            content: send
            }
          }
        })
      })


}

/*
{
  version: 1,
  type: 2,
  token: 'aW50ZXJhY3Rpb246ODM0MTQzMzU2NDcxODY5NDUxOlE4eU9pd2VKNzl6UTViSmdBbkhYaHQwNEJ5dldlZlFBUVBnWFN0UmJ1ajBOa2JHUEdVUDNtdm1kNUJ0dnJrRVNZcU1KbWFGY2pXQjNWWGc4bUp1aG45WjRVSDdMTGdSUjM1TW5VdDhtQ1FFdTlvc1ZIUkV3Q3JHZnRKY3IyMEl1',      
  member: {
    user: {
      username: 'Cannon',
      public_flags: 256,
      id: '811657485462274129',
      discriminator: '4433',
      avatar: 'a_519b3f06e0ea22d7bf3f27307d711a3b'
    },
    roles: [ '814860229040406630', '815304261902532668' ],
    premium_since: null,
    permissions: '8589934591',
    pending: false,
    nick: 'aaa',
    mute: false,
    joined_at: '2021-02-26T12:14:43.485000+00:00',
    is_pending: false,
    deaf: false
  },
  id: '834143356471869451',
  guild_id: '814832821125775420',
  data: { options: [ [Object] ], name: 'penguin', id: '832297937132322907' },
  channel_id: '814832821603532811',
  application_id: '814830308688003142'
} */
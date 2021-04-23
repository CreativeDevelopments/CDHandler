import loader, { loadTypes } from './loader';
import colour from 'cdcolours';
import { Collection, Client } from "discord.js";
import fetch from 'node-fetch'

const register = async (dir: any, Fcommands: Collection<string, Record<string, any>>, Faliases: Collection<string[], Record<string, any>>, Fcategories: any, Fcategory: string, client: Client, Fslash: Collection<string, Record<string, string>>) => {
    loader(dir, async ({ path, name, ext, filename }: loadTypes) => {
        if(filename.endsWith('.d.ts')) return;
        if (filename.endsWith(".ts") || ext in require.extensions) {

            const cmd = (await import(path)).default;
            
            if (!cmd.name) throw new Error(colour("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without name");
            if (!cmd.fire && !cmd.callback && !cmd.run && !cmd.execute) throw new Error(colour("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function");

            if (!cmd.slash && cmd.slash !== false) { 
                Fcommands.set(cmd.name.toLowerCase(), cmd);
                console.log(colour("[CDHandler]", { textColour: "blue" }) + " Loading command " + cmd.name);

                if (cmd.aliases) {
                    for (const command of cmd.aliases) Faliases.set(command.toLowerCase(), cmd.name);

                    const category = cmd.category || Fcategory || "Misc";
            
                    let categoryGetter = Fcategories.get(category.toLowerCase());
                    if(!categoryGetter) categoryGetter = [category];
                    categoryGetter.push(cmd.name);
                
                    Fcategories.set(category.toLowerCase(), categoryGetter);
                }             
            } else if (cmd.slash === false) {

                if (!cmd.servers || !cmd.servers[0]) {

                    // @ts-ignore
                    let slashes = await client.api.applications(client.user?.id).commands.get().catch((err: any) => console.error(err))
                    let slashCommand = slashes.find((s: any) => s.name.toLowerCase() == cmd.name.toLowerCase()) ?? null
                    if (slashCommand == null) return;
                    else {
                        await fetch(`https://discord.com/api/v8/applications/${client.user!.id}/commands/${slashCommand.id}`, {
                            method: 'delete',
                            headers: {
                            'Authorization': 'Bot ' + client.token,
                            'Content-Type': 'application/json'
                            }
                        }).catch((err: any) => console.error(err))
                        console.log(colour("[CDHandler]", { textColour: "red" }) + " Deleting global slash command " + cmd.name)
                    }
                } else {

                    for(const server of cmd.servers){

                        // @ts-ignore
                        let sls = await client.api.applications(client.user?.id).guilds(server).commands.get().catch((err: any) => console.error(err));
                        let sl = sls.find((s: any) => s.name.toLowerCase() == cmd.name.toLowerCase());
                        if (typeof sl == 'undefined') continue;

                        await fetch(`https://discord.com/api/v8/applications/${client.user!.id}/guilds/${server}/commands/${sl.id}`,
                            {
                                method: 'delete',
                                headers: {
                                    'Authorization': 'Bot ' + client.token,
                                    'Content-Type': 'application/json'
                                }
                            }
                        ).catch((err: any) => console.error(err));

                        console.log(colour("[CDHandler]", { textColour: "red" }) + " Deleting slash command " + cmd.name);
                    }

                }
            } else {
                if (!cmd.run && !cmd.execute && !cmd.fire && !cmd.callback) throw new Error(colour("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without run function")

                console.log(colour("[CDHandler]", { textColour: "blue" }) + " Loading slash command " + cmd.name)

                const category = cmd.category || Fcategory || "Misc"
        
                let categoryGetter = Fcategories.get(category.toLowerCase())
                if(!categoryGetter) categoryGetter = [category]
                categoryGetter.push(cmd.name)
            
                Fcategories.set(category.toLowerCase(), categoryGetter)

                const urls: string[]  = [];
                if (cmd.servers && cmd.servers[0]) cmd.servers.forEach((server: string) => urls.push(`https://discord.com/api/v8/applications/${client.user!.id}/guilds/${server}/commands`))
                else urls.push(`https://discord.com/api/v8/applications/${client.user!.id}/commands`)
            
                const json = {
                    name: cmd.name,
                    description: cmd.description ?? "No description",
                    "options": cmd.data
                };

                for (const url of urls){
                    const response = await fetch(url, {
                        method: 'post',
                        body: JSON.stringify(json),
                        headers: {
                        'Authorization': 'Bot ' + client.token,
                        'Content-Type': 'application/json'
                        }
                    })

                    const Responser = await response.json()

                    const cmdJson = {
                        type: cmd.type || 4,
                        run: cmd.run || cmd.fire || cmd.execute || cmd.callback || null
                    }

                    Fslash.set(Responser.id, cmdJson);
                    Fcommands.set(cmd.name.toLowerCase(), cmd);
                }
            }
        }
    });
}

export default register;

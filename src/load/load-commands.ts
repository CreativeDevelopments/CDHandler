import { join } from "path";
import { readdirSync, lstatSync, existsSync, mkdirSync } from "fs";
import colour from 'cdcolours';
import { Collection, Client } from "discord.js";

const register = async (dir: any, Fcommands: Collection<string, Record<string, any>>, Faliases: Collection<string[], Record<string, any>>, Fcategories: any, Fcategory: string) => {

    const exists = existsSync(join(process.cwd(), dir))
    if (!exists) { 
        console.warn(colour("[CDHandler]", { textColour: "red" }) + " Cannot find the folder " + dir + " creating one...")
        mkdirSync(dir, { recursive: true });
    }

    const files = readdirSync(join(dir))
    for (const file of files) {

        const isFolder = lstatSync(join(process.cwd(), dir, file))
        if (isFolder.isDirectory()) register(join(dir, file), Fcommands, Faliases, Fcategories, Fcategory)
        else {
            if (file.endsWith(".coffee") || file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts")) {

                const cmd = (await import(join(process.cwd(), dir, file))).default
                
                if (!cmd.name) throw new Error(colour("[CDHandler] [ERROR]", { textColour: "red" }) + " Command without name")
                else if (!cmd.fire && !cmd.callback && !cmd.run && !cmd.execute) throw new Error(colour("[FIRE-HANDLER] [ERROR]", { textColour: "red" }) + " Command without fire function")
                else { 
                    Fcommands.set(cmd.name.toLowerCase(), cmd)
                    console.log(colour("[CDHandler]", { textColour: "blue" }) + " Loading command " + cmd.name)

                    if (cmd.aliases) {
                    for (const command of cmd.aliases) {
                        Faliases.set(command.toLowerCase(), cmd.name) 
                      }
                    }

                        let category = cmd.category || Fcategory || "Misc"
                 
                        let categoryGetter = Fcategories.get(category.toLowerCase())
                        if(!categoryGetter) categoryGetter = [category]
                        categoryGetter.push(cmd.name)
                    
                        Fcategories.set(category.toLowerCase(), categoryGetter)
                                          
                }

            } else continue;

        }
    }
}

export default register;
import loader, { loadTypes } from './loader';
import colour from 'cdcolours';
import { Client } from "discord.js";

const load = async (client: Client, dir: any) => {
    loader(dir, async ({ path, name, ext, filename }: loadTypes) => {
        if(filename.endsWith('.d.ts')) return;

        const loaded = () => console.log(colour("[CDHandler]", { textColour: "magenta" }) + ` Loading feature ${name}`);

        if (filename.endsWith(".ts")) {
            (await import(path)).default(client);
            return loaded();
        }
        if (ext in require.extensions) {
            require(path)(client);
            return loaded();
        }
    });
}

export default load;

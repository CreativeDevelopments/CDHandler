import loader from './loader';
import colour from 'cdcolours';
import { Client } from "discord.js";

const load = async (client: Client, dir: any) => {
    loader(dir, async ({ path, name, ext, filename }) => {
        if(filename.endsWith('.d.ts')) return;

        const loaded = () => console.log(colour("[CDHandler]", { textColour: "green" }) + ` Loading event ${name}`);

        if (filename.endsWith(".ts")) {
            const event = (await import(path)).default;
            client.on(name, event.bind(null, client));
            return loaded();
        }
        if (ext in require.extensions) {
            const event = require(path);
            client.on(name, event.bind(null, client));
            return loaded();
        }
    });
}

export default load;

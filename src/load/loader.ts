import { join, parse, isAbsolute } from 'path';
import { readdir, lstat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import colour from 'cdcolours';

type loadTypes = {
    path: string
    name: string
    ext: string
    filename: string
}

const loader = async (dir: string, callback: Function) => {
    const path = isAbsolute(dir) ? dir : join(process.cwd(), dir);

    if(!existsSync(path)){
        console.warn(colour("[CDHandler]", { textColour: "red" }) + " Cannot find the folder " + dir + " creating one...");
        await mkdir(dir, { recursive: true });
    }

    const items = await readdir(path);

    for(const item of items){
        const itemPath = join(path, item);
        const itemStat = await lstat(itemPath);
        
        if(itemStat.isDirectory()){
            loader(itemPath, (...a:any[]) => callback(...a));
            continue;
        }
        if(!itemStat.isFile()) continue;

        const { name, ext, base } = parse(itemPath);

        callback({
            path: itemPath,
            name: name,
            ext: ext,
            filename: base,
        });
    }
}

export default loader;
export { loadTypes }

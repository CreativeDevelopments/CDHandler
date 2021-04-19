import * as fs from 'fs'
import Command, { CommandOptions } from "./Command";
import CDHandler from "./CDHandler"

require.extensions[".coffee"] = (module, filename) =>

    exports._compile(
        require('coffeescript')
        .compile(
            fs.readFileSync(
                filename,
                {encoding:"utf8"}
            )
        ),
        filename
    )
;

export default CDHandler
export { Command }
export type { CommandOptions }
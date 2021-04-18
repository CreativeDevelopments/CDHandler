fs = require('fs')

require.extensions[".coffee"] = (module, filename) =>

    module._compile(
        import 'coffeescript'
        .compile(
            fs.readFileSync(
                filename,
                {encoding: "utf8"}
            )
        ),
        filename
    )
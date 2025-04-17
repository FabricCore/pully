Command.register({
    package: "modules/pully/commands",
    name: "pully",

    execute: "updateAll.js",

    subcommands: {
        install: {
            args: {
                packages: {
                    type: StringArgumentType.greedyString(),
                    execute: "install.js",
                },
            },
        },
        uninstall: {
            args: {
                packages: {
                    type: StringArgumentType.greedyString(),
                    execute: "uninstall.js",
                },
            },
        },
        update: {
            name: "update",
            execute: "updateAll.js",
        },
    },
});

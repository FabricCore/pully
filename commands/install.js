function main(ctx) {
    let packages = StringArgumentType.getString(ctx, "packages");
    pully.pull(
        packages.split(" ").filter((s) => s.length != 0),
        (changed) => {
            if (changed) {
                console.log("\u00A7aInstallation completed, reloading...");
                require("modules/register.js");
                console.log(
                    "\u00A7aReload completed, rejoin world to refresh commands",
                );
            }
        },
    );
}

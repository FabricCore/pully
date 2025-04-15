function main(ctx) {
    let packages = StringArgumentType.getString(ctx, "packages");
    pully.pull(packages.split(" ").filter((s) => s.length != 0), () => {
        console.log("\u00A7aInstallation completed, reloading...");
        require("init.js");
        console.log("\u00A7aReload completed, rejoin world to refresh commands");
    });
}

function main() {
    pully.updateAll(() => {
        console.log("\u00A7aUpdate completed, reloading...");
        require("init.js");
        console.log("\u00A7aReload completed, rejoin world to refresh commands");
    });
}

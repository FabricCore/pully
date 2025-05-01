(() => {
    if (modcore.fs.exists("modules/pully")) {
        console.log(
            "\u00A76Pully is already installed, update pully using pully commands.",
        );
        return;
    }

    modcore.fs.delete("storage/pullyInstaller");
    console.log("\u00A7eDownload has started");
    modcore.net.getDownloadUnzip(
        "https://github.com/FabricCore/pully/archive/refs/heads/master.zip",
        () => {
            modcore.fs.move(
                "storage/pullyInstaller/pully-master",
                "modules/pully",
            );
            modcore.fs.delete("storage/pullyInstaller");
            console.log("\u00A7aPully installed, reloading script...");
            require("modules/register.js");
            console.log(
                "\u00A7aReload completed, rejoin world to refresh commands",
            );
            console.log();
        },
        "storage/pullyInstaller",
    );
})();

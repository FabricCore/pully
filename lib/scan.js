pully.installed = () =>
    modcore.fs
        .dirItems("modules")
        .filter(
            (path) =>
                modcore.fs.isDir(path) &&
                modcore.fs.exists(`${path}/package.json`),
        )
        .map((pack) => {
            try {
                return require(`${pack}/package.json`);
            } catch (ignored) {
                console.error(`Could not read ${pack}/package.json`);
            }
        })
        .filter((j) => j !== undefined)
        .reduce((obj, v) => {
            obj[v.name] = v;
            return obj;
        }, {});

pully.repo = (then) => {
    let config = pully.config();
    modcore.net.get(config.repo, (res) => then(JSON.parse(res.body())));
};

pully.repoBlocking = () => {
    let config = pully.config();
    return JSON.parse(modcore.net.getBlocking(config.repo).body());
};

pully.resolveTask = requireRunnable("modules/pully/lib/resolveTask.js");
pully.pull = (packs, then, isFullUpdate = false) => {
    if (modcore.fs.exists("modules/keep/package.json"))
        pully.resolveTask.spawn(undefined, packs, then, true, isFullUpdate);
    else {
        console.log("\u00A76Pully requires keep to function, installing keep");
        pully.resolveTask.spawn(
            undefined,
            ["keep"],
            () => {
                pully.resolveTask.spawn(
                    undefined,
                    packs,
                    then,
                    true,
                    isFullUpdate,
                );
            },
            true,
            false,
        );
    }
};

pully.versionCode = (version) => {
    return version.split(".").map((s) => parseInt(s.trim()));
};

pully.updateAll = (then) => {
    pully.pull(Object.keys(pully.installed()), then, true);
};

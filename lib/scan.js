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

{
    let resolveTask = requireRunnable("modules/pully/lib/resolveTask.js");
    pully.pull = (packs) => {
        resolveTask.spawn(undefined, packs);
    };
}

pully.versionCode = (version) => {
    return version.split(".");
};

pully.updateAll = () => {
    pully.pull(Object.keys(pully.installed()));
};

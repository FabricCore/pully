function resolve(repo, packs, print = true) {
    if (repo.toString() == "undefined") {
        console.log("\u00A7eFetching repository");
        repo = pully.repoBlocking();
    }

    if (!Array.isArray(packs)) packs = [packs];

    let installed = pully.installed();

    let manifestCache = {};
    let toPull = [];

    function getDeps(pack, repo, deps) {
        if (repo[pack] == undefined) {
            console.error(`Package "${pack}" not found in repo, exiting.`);
            return;
        }
        let manifest = JSON.parse(
            modcore.net.getBlocking(repo[pack].package).body(),
        );

        manifestCache[pack] = manifest;

        Object.keys(manifest.dependencies)
            .filter((d) => !deps.includes(d))
            .forEach((newPack) => {
                deps.push(newPack);
                deps = getDeps(newPack, repo, deps);
            });

        return deps;
    }

    for (let i = 0; i < packs.length; i++) {
        let pack = packs[i];
        if (repo[pack] == undefined) {
            console.error(`Package "${pack}" not found in repo, exiting.`);
            return;
        }

        toPull.push(pack);
        toPull = getDeps(pack, repo, toPull);
    }

    toPull = toPull.filter(
        (pack) =>
            installed[pack] == undefined ||
            pully.versionCode(installed[pack].version) <
                pully.versionCode(manifestCache[pack].version),
    );

    toPull.forEach((p) => pully.pullOne(p, repo[p].zip));
}

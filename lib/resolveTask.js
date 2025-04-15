function resolve(repo, packs, then, print, isFullUpdate) {
    if (repo.toString() == "undefined") {
        if (print) console.log("\u00A7eFetching repository");
        repo = pully.repoBlocking();
    }

    if (packs.length == undefined) packs = [packs];

    let installed = pully.installed();

    let manifestCache = {};
    let toPull = [];

    let depsSet = {};

    function getDeps(pack, repo, deps) {
        if (repo[pack] == undefined) {
            return deps;
        }
        let manifest = JSON.parse(
            modcore.net.getBlocking(repo[pack].package).body(),
        );

        manifestCache[pack] = manifest;

        Object.keys(manifest.dependencies)
            .filter((d) => !deps.includes(d))
            .forEach((newPack) => {
                deps.push(newPack);
                depsSet[newPack] = true;
                deps = getDeps(newPack, repo, deps);
            });

        return deps;
    }

    for (let i = 0; i < packs.length; i++) {
        let pack = packs[i];
        if (repo[pack] == undefined) {
            console.error(
                `Package "${pack}" not found in repo, EXPECT TROUBLE.`,
            );
            continue;
        }

        toPull.push(pack);
        toPull = getDeps(pack, repo, toPull);
    }

    modkeep.get("pully/explicits", {}, (obj) => {
        toPull = toPull.filter((pack) => {
            if (
                installed[pack] == undefined ||
                pully.versionCode(installed[pack].version) <
                    pully.versionCode(manifestCache[pack].version)
            ) {
                return true;
            } else {
                if (depsSet[p] || isFullUpdate) {
                    obj[p] = obj[p] == true;
                } else {
                    obj[p] = true;
                }
                return false;
            }
        });

        toPull.forEach((p) => {
            if (pully.pullOne(p, repo[p].zip, print)) {
                if (depsSet[p] || isFullUpdate) {
                    obj[p] = obj[p] == true;
                } else {
                    obj[p] = true;
                }
            }

            return obj;
        });
    });

    if (typeof then == "function") then();
}

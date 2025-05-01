function cleanTask(then, print = true) {
    let depTree = pully.fullDepTree();
    let packs = Object.entries(modkeep.get("pully/explicits", {}))
        .map(([name, explicit]) => (explicit ? undefined : name))
        .filter((p) => p != undefined);

    let toRemove = [];

    while (true) {
        let noDependents = [];
        packs = packs.filter((pack) => {
            if (Object.keys(depTree[pack].dependents).length == 0) {
                noDependents.push(pack);
                Object.keys(depTree[pack].dependencies).forEach(
                    (dep) => delete depTree[dep].dependents[pack],
                );
                return false;
            } else return true;
        });

        if (noDependents.length == 0) break;

        toRemove = toRemove.concat(noDependents);
    }

    toRemove = toRemove.filter((pack) => {
        if (modcore.fs.exists(`modules/${pack}/.git`)) {
            console.log(
                `\u00A77[\u00A7cGit Protection\u00A77] \u00A7cPackage "\u00A76\u00A7l${pack}\u00A7c" is not removed because it is a Git repository, please remove it manually.`,
            );
            return false;
        } else return true;
    });

    if (toRemove.length == 0) {
        if (print) console.log("\u00A76Nothing to uninstall");
        return;
    }

    modkeep.get("pully/explicits", {}, (obj) => {
        toRemove.forEach((pack) => {
            delete obj[pack];
            modcore.fs.delete(`modules/${pack}`);
            if (print) console.log(`\u00A7aUninstalled ${pack}`);
        });
        return obj;
    });

    if (print)
        console.log(
            `\u00A7aUninstalled ${toRemove.length} package${toRemove.length == 1 ? "" : "s"}, restart game to take effect`,
        );

    then();
}

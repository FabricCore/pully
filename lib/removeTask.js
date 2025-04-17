function removeTask(packs, then, print = true) {
    let depTree = pully.fullDepTree();
    let packs = packs.filter((pack) => depTree[pack] != undefined);

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

        if (packs.length == 0 && noDependents.length == 0) break;
        if (noDependents.length == 0) {
            packs.forEach((pack) => {
                console.error(
                    `Cannot remove ${pack} because it is required by ${Object.keys(depTree[pack].dependents).join(", ")}`,
                );
            });
            if (print) console.log("\u00A76Nothing to uninstall");
            return;
        }

        toRemove = toRemove.concat(noDependents);
    }

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

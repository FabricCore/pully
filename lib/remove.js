pully.fullDepTree = () => {
    let installed = pully.installed();

    Object.values(installed).forEach((pack) => (pack.dependents = {}));

    Object.entries(installed).forEach(([dependent, { dependencies }]) => {
        Object.keys(dependencies).forEach((dependency) => {
            if (installed[dependency] == undefined) return;

            installed[dependency].dependents[dependent] = true;
        });
    });

    return installed;
};

pully.removeTask = requireRunnable("modules/pully/lib/removeTask.js");
pully.remove = (packs, then) => {
    if (modcore.fs.exists("modules/keep/package.json"))
        pully.removeTask.spawn(packs, then);
    else {
        console.log("\u00A76Pully requires keep to function, installing keep");
        pully.resolveTask.spawn(
            undefined,
            ["keep"],
            () => {
                pully.removeTask.spawn(packs, then);
            },
            true,
            false,
        );
    }
};

pully.cleanTask = requireRunnable("modules/pully/lib/cleanTask.js");
pully.clean = (then) => {
    if (modcore.fs.exists("modules/keep/package.json"))
        pully.cleanTask.spawn(then);
    else {
        console.log("\u00A76Pully requires keep to function, installing keep");
        pully.resolveTask.spawn(
            undefined,
            ["keep"],
            () => {
                pully.cleanTask.spawn(then);
            },
            true,
            false,
        );
    }
};

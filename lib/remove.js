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

{
    let removeTask = requireRunnable("modules/pully/lib/removeTask.js");
    pully.remove = (packs, then) => {
        removeTask.spawn(packs, then);
    };
}

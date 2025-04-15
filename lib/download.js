pully.pullOne = (pack, remote, print) => {
    let target = `storage/pully/tmp/${pack}`;
    modcore.fs.delete(target);
    if (print) console.log(`\u00A7eDownloading ${pack}`);
    modcore.net.getDownloadUnzipBlocking(remote, target);

    let roots = modcore.fs
        .dirItemsRecursive(target)
        .filter((t) => t.endsWith("/package.json"));
    roots.sort((a, b) => a.length - b.length);

    if (roots.length == 0) {
        console.error(
            `Could not find package.json in ${pack}, aborting.\n(Not installed)`,
        );
        return false;
    } else {
        let root = roots[0].slice(0, -13);
        modcore.fs.delete(`modules/${pack}`);
        modcore.fs.move(root, `modules/${pack}`);
        if (print) console.log(`\u00A7aInstalled ${pack}`);
        return true;
    }
};

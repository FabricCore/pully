pully.config = () => {
    return modkeep.get("pully", {}, (obj) => {
        obj.repo ??=
            "https://raw.githubusercontent.com/FabricCore/repo/refs/heads/master/index.json";
        return obj;
    });
};

pully.config = () => {
    if (typeof modkeep == "undefined") {
        return {
            repo: "https://raw.githubusercontent.com/FabricCore/repo/refs/heads/master/index.json",
        };
    } else
        return modkeep.get("pully/config", {}, (obj) => {
            obj.repo ??=
                "https://raw.githubusercontent.com/FabricCore/repo/refs/heads/master/index.json";
            return obj;
        });
};

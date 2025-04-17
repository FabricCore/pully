function main(ctx) {
    let packages = StringArgumentType.getString(ctx, "packages");
    pully.remove(
        packages.split(" ").filter((s) => s.length != 0),
        () => {},
    );
}

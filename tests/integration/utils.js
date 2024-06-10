export const baseCommands = process.versions.node.startsWith("14")
    ? ["./cli.js"] : ["."];

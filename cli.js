#!/usr/bin/env node
/**
 * Copyright (c) Nikolay Latyshev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import yargs from "yargs-parser";
import add from "./src/add/index.js";
import setup from "./src/setup/index.js";
import Constants from "./src/constants.js";

// TODO: allow all prompts to be filled as flags to avoid interactivity
const { config, c, help, _: [command = "setup", ...users] } = yargs(process.argv.slice(2));
const configPath = config || c || Constants.CONFIG_FILENAME;

const commands = {
    setup: () => setup({ configPath }),
    add: () => add({
        users,
        configPath,
    }),
};
const fallback = () => console.error(
    `'${command}' command does not exist, please, use one of:
    ${Object.keys(commands).join("\n    ")}`,
);

if (process.env.NODE_ENV === "test") {
    const { RemoteHttpInterceptor } = await import("@mswjs/interceptors/RemoteHttpInterceptor");
    const { ClientRequestInterceptor } = await import("@mswjs/interceptors/ClientRequest");

    const interceptor = new RemoteHttpInterceptor({
        // Alternatively, you can use presets.
        interceptors: [new ClientRequestInterceptor()],
    });

    interceptor.apply();

    process.on("disconnect", () => {
        interceptor.dispose();
    });
}

if (help) {
    console.info(`
    Usage: sfcc-users [options] [command]

    Options:
        -c, --config            Specify a non-default path to config

    Commands:
        setup                   Generate config file if it does not exist, otherwise modify it
        add [emails...|file]    Add specified emails as accounts to AM/SFCC instances
`);
} else {
    (commands[command] || fallback)();
}

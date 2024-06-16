/**
 * Copyright (c) Nikolay Latyshev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @typedef {import('prompts')} Prompts
 */

import prompt from "../prompter.js";
import getQuestions from "./getQuestions.js";
import addUsers from "./addUsers.js";
import { toEmails } from "./utils.js";
import { toCwdFileUrl } from "../utils.js";

const selectConfig = async (configs) => {
    if (configs.length < 2) return configs[0];

    const { config } = await prompt({
        type: "select",
        name: "config",
        message: "Choose realm",
        format: (index) => configs[index],
        choices: configs.map((c) => c.realm),
        initial: configs.length - 1,
    });

    return config;
};

/**
 * @param {Object} params
 * @param {Prompts} params.prompt - promter to ask CLI questions
 * @param {string[]} params.users - predefined list of emails
 * @param {Prompt} params.configPath - path to config file
 * @returns {Promise}
 */
export default async ({
    users,
    configPath,
}) => {
    const { default: configs } = await import(toCwdFileUrl(configPath));
    const config = await selectConfig(configs.default ?? configs);

    const questions = getQuestions(config);
    const {
        source,
        instances,
        roles,
        instanceRoles,
    } = await prompt(questions, { source: users.join(",") });
    const emails = await toEmails(source);

    return addUsers({
        emails,
        orgName: config.orgName,
        instances,
        roles,
        instanceRoles,
    });
};

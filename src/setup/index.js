/**
 * Copyright (c) Nikolay Latyshev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { writeFile, readFile } from "fs/promises";
import { dirname, relative, sep, posix } from "path";

import prompt from "../prompter.js";
import Constants from "../constants.js";
import { getQuestions } from "./getQuestions.js";
import { getInstanceType, getInstances, toInstancesConfig } from "./utils.js";
import { toCwdFilePath, toCwdFileUrl } from "../utils.js";

const toESModuleConfigFile = (config, dwImportPath) => `
import { createRequire } from 'module';

const DW_PATH = '${dwImportPath}';
const require = createRequire(import.meta.url);
const dw = require(DW_PATH);

export const configs = ${JSON.stringify(config, null, 4)};

export default configs.map((config) => ({ ...dw, ...config }));
`;

const toCommonJSConfigFile = (config, dwImportPath) => `
const dw = require('${dwImportPath}');

module.exports.configs = ${JSON.stringify(config, null, 4)};

module.exports.default = module.exports.configs.map((config) => ({ ...dw, ...config }));
`;

export default async ({ configPath }) => {
    const cwdConfigPath = toCwdFilePath(configPath);
    const dwPath = relative(dirname(cwdConfigPath), Constants.DW_PATH);
    const dwImportPath = "./" + dwPath.split(sep).join(posix.sep);
    const existingConfig = await import(toCwdFileUrl(configPath)).catch(() => ({}));
    const dw = await readFile(Constants.DW_PATH).then(JSON.parse).catch(() => {
        console.error(`Error: ${Constants.DW_PATH} is required to use `
            + "username/password and client-id/client-secret from it");
        process.exit(1);
    });
    const packageJson = await readFile(Constants.PACKAGE_JSON_PATH)
        .then(JSON.parse).catch(() => ({}));

    const {
        isAddMode,
        orgName,
        realm,
        instance,
        instanceRoles,
    } = await prompt(getQuestions(dw, existingConfig.configs));
    const instanceType = getInstanceType(instance);
    const isPIG = Constants.HOSTNAME_PREFIXES.has(instanceType);
    const instances = isPIG ? getInstances(instance, instanceType) : [instance];
    const config = {
        orgName,
        realm,
        instances: toInstancesConfig(instances, realm),
        roles: [...Constants.AM_ROLES],
        instanceRoles: instanceRoles.split(",").filter(Boolean),
    };

    const toConfigFile = packageJson.type === "module"
        ? toESModuleConfigFile : toCommonJSConfigFile;
    const template = toConfigFile(
        isAddMode ? existingConfig.configs.concat(config) : [config],
        dwImportPath,
    );

    await writeFile(cwdConfigPath, template);

    console.info(`${isAddMode ? "Updated" : "Created"} ${cwdConfigPath}`);

    // TODO: validate dw.json for required fields
    // TODO: validate client_id perms and notify to use
    // "https://github.com/SalesforceCommerceCloud/sfcc-ci#configure-an-api-key";
};

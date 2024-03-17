import { getHostname, hasValidHostname } from "./utils.js";

const helpConfigURL = "https://github.com/SalesforceCommerceCloud/sfcc-ci#configure-an-api-key";

export const getQuestions = (dw, configs = []) => {
    const questions = [
        {
            type: configs.length ? "toggle" : null,
            name: "isAddMode",
            message: "Config path exists. Do you want to rewrite it or add additional org?",
            active: "add",
            inactive: "rewrite",
        },
        {
            type: "text",
            name: "orgName",
            message: "Org name from AM (see https://account.demandware.com/ Organizations row)",
            initial: configs.length
                ? configs[0].orgName
                : "Northern Trail Outfitters",
        },
        {
            type: "text",
            name: "realm",
            message: "Realm code (4 letters)",
            initial: dw["realm"] || "abcd",
            validate: (value) => value.length === 4 || "Should be 4 letters",
        },
        {
            type: "text",
            name: "instance",
            message: "PIG instance hostname (any)",
            initial: dw["hostname"] || "staging-us01-nto.demandware.net",
            validate: (input) => hasValidHostname(input) || "Please, provide hostname or URL",
            format: getHostname,
        },
        {
            type: "text",
            name: "instanceRoles",
            message: "Additional instance roles (comma separated, leave emtpy to skip)",
        },
    ];

    return questions;
};

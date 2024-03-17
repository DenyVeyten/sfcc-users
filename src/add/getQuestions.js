import { validateSource } from "./utils.js";

export default (config) => {
    return [
        {
            type: "list",
            name: "source",
            message: "Specify filename with emails (one per line)"
                + " or inline email (comma separated)",
            initial: "john.doe@example.com, jane.doe@example.com",
            // TODO: prompts.overrides issue - string vs array for list type in no overrides mode
            format: (values) => Array.isArray(values) ? values : values.split(","),
            // TODO: add autocomplete for files/folders in cwd
            validate: validateSource,
        },
        {
            type: "multiselect",
            name: "instances",
            message: "Pick instances users can access",
            choices: config.instances,
            format: (values) => values.map((index) => config.instances[index]),
            min: 1,
            hint: "- Space to select. Return to submit",
        },
        {
            type: config.roles.length ? "multiselect" : "text",
            name: "roles",
            message: "AM role (optional)",
            choices: config.roles,
            format: (value) => config.roles.length
                ? value.map((index) => config.roles[index])
                : [value],
            max: 1,
            hint: "- Space to select. Return to submit",
        },
        {
            type: config.instanceRoles.length ? "multiselect" : "text",
            name: "instanceRoles",
            message: "Additional local role (optional)",
            choices: config.instanceRoles,
            format: (value) => config.instanceRoles.length
                ? value.map((index) => config.instanceRoles[index])
                : [value].filter(Boolean),
            hint: "- Space to select. Return to submit",
        },
    ];
};

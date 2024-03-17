export default {
    CONFIG_FILENAME: "sfcc-user.config.js",
    HOSTNAME_PREFIXES: new Set(["development", "staging", "production"]),
    SHORTCODE_POSTFIXES: {
        production: "prd",
        staging: "stg",
        development: "dev",
    },
    AM_ROLES: new Set(["bm-user", "bm-admin"]),
    DW_PATH: "./dw.json",
    PACKAGE_JSON_PATH: "./package.json",
};

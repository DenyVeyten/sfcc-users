
import { createRequire } from "module";

const DW_PATH = "./dw.json";
const require = createRequire(import.meta.url);
const dw = require(DW_PATH);

export const configs = [
    {
        "orgName": "Northern Trail Outfitters",
        "realm": "abcd",
        "instances": [
            {
                "title": "staging-us01-nto.demandware.net",
                "hostname": "staging-us01-nto.demandware.net",
                "shortcode": "abcd_stg",
            },
        ],
        "roles": [
            "bm-user",
            "bm-admin",
        ],
        "instanceRoles": ["Non_Admin"],
    },
];

export default configs.map((config) => ({ ...dw, ...config }));

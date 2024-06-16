# SFCC Users Management CLI 

Simple tool to quickly manage SFCC users in Account Manager and SFCC instances.

Do you need to provide access to SFCC instances frequently, but don't want to spend much time on AM authentication and clicking through it's UI? Do you have non-default SFCC roles that you need to assign to users, but have to wait for their first login to the SFCC instance?

`sfcc-users` will do it for you in several seconds, just give it emails of users you need to provide access to.

# Features

- Create AM users with defined roles and scopes
- Create SFCC users with non-default roles
- Process list of emails at once
- More features to come!

# Installation

## Prerequesite

This tool uses `sfcc-ci` and it's [configuration](https://github.com/SalesforceCommerceCloud/sfcc-ci#how-do-i-get-set-up) to interact with SFCC instances (to manage users there).

It looks for valid `dw.json` config with fields needed for `sfcc-ci` - "client-id", "client-secret", "username", "password". Format is described in [sfcc-ci guide](https://github.com/SalesforceCommerceCloud/sfcc-ci#configuration)

## First-time installation

For the very first run, you need to generate configuration file. Run from the root of your project (the same level where `dw.json` is):
```
npx sfcc-users setup
```

You will be asked for several questions to generate configuration file for future use. You may want to commit the configuration file to let your teammates skip the `setup` step.

<img src="demo/setup-demo.svg?raw=true"/>

You can create/modify generated configuration file manually if you need. Format is described in [Configuration file](#configuration-file) section below.

# Usage

## Provide emails

You can provide emails by simply running the `add` command:

```
npx sfcc-users add
```

The program will ask you to enter one or several emails (comma-separated).

<img src="demo/add-demo.svg?raw=true"/>

## Provide a file with emails

You can provide a file with emails (one per line):

<img src="demo/add-file-demo.svg?raw=true"/>

## Provide initial arguments

You can also specify list of emails or a file as an argument of `add` command to skip the first prompt:

```
npx sfcc-users add test.user@example.com

# or

npx sfcc-users add users.txt
```

## Configuration file

Configuration file is JavaScript file that is used by `sfcc-users` to identify where and how users should be managed.

Format (CommonJS config will be generated instead if you don't use `"type": "module"`):

```
import { createRequire } from 'module';

const DW_PATH = "./dw.json";
const require = createRequire(import.meta.url);
const dw = require(DW_PATH);

const configs = [
    {
        "orgName": "Northern Trail Outfitters",
        "realm": "abcd",
        "instances": [
            {
                "title": "abcd-001.dx.commercecloud.salesforce.com",
                "hostname": "abcd-001.dx.commercecloud.salesforce.com",
                "shortcode": "abcd_001",
            },
            {
                "title": "You can change title to anything",
                "hostname": "abcd-002.dx.commercecloud.salesforce.com",
                "shortcode": "abcd_002",
            },
            {
                "title": "UAT instance",
                "hostname": "development-us01-nto.demandware.net",
                "shortcode": "abcd_dev",
            },
            {
                "title": "Preview environment",
                "hostname": "staging-us01-nto.demandware.net",
                "shortcode": "abcd_stg",
            },
            {
                "title": "Production",
                "hostname": "production-us01-nto.demandware.net",
                "shortcode": "abcd_prd",
            },
        ],
        // AM roles to select from (only SFCC roles are supported)
        "roles": [
            "bm-user",
            "bm-admin",
        ],
        // Non-default SFCC instance roles that you may have
        "instanceRoles": ["Non_Admin"],
    },
];

export default configs.map((config) => ({ ...dw, ...config }));
```
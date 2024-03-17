import Constants from "../constants.js";

/**
 * Adds protocol to the beginning of a string, if not added already
 * @param {string} string - string to add protocol
 * @returns string with protocol
 */
const withProtocol = (string) => /^https?:\/\//.test(string) ? string : `https://${string}`;

/**
 * Tries to convert an input string into a hostname
 * @param {string} string - string to convert to a hostname
 * @returns {string} hostname
 * @throws {TypeError} when URL can't be created from the input string
 */
export const getHostname = (string) => {
    const url = withProtocol(string);

    return new URL(url).hostname;
};

/**
 * Validates whether a string is a valid hostname
 * @param {string} string - string to validate
 * @returns {boolean} whether string is a valid hostname
 */
export const hasValidHostname = (string) => {
    if (string.split(".").length < 2) return false;

    const url = withProtocol(string);

    if (URL.canParse) return URL.canParse(url);

    try {
        return !!getHostname(url);
    } catch (error) {
        return false;
    }
};

export const getInstanceType = (instance) => instance.split("-")[0];

export const getInstances = (instance, instanceType) => Array.from(Constants.HOSTNAME_PREFIXES)
    .map((prefix) => instance.replace(instanceType, prefix));

export const getShortcode = (instance, realm) => {
    const instanceType = getInstanceType(instance);
    const isODS = instanceType === realm;
    const PIGPostfix = Constants.SHORTCODE_POSTFIXES[instanceType];

    if (PIGPostfix) return `${realm}_${PIGPostfix}`;

    if (isODS) return instance.split(".")[0].replace("-", "_");

    // TODO: test this for classic sandbox
    return `${realm}_${instanceType}`;
};

export const toInstancesConfig = (instances, realm) => instances.map((instance) => ({
    title: instance,
    hostname: instance,
    // TODO: handle classic sandboxes
    shortcode: getShortcode(instance, realm),
}));

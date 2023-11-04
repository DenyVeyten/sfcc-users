import Constants from "../constants.js";

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

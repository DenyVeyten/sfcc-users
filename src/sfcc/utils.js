
const ROLE_NAMES_MAP = { "bm-admin" : "ECOM_ADMIN", "bm-user" : "ECOM_USER" };

/**
 * Maps the role name to an internal role ID accepted by the API.
 *
 * @param {String} role - the role name to map
 * @return {String} the internal role ID
 */
const mapToInternalRole = (role) => ROLE_NAMES_MAP[role] || role.toUpperCase().replace(/-/g, "_");

/**
 * TODO: Workaround for sfcc-ci bug https://github.com/SalesforceCommerceCloud/sfcc-ci/issues/512
 * Transforms the passed rolesConfig object to an internal format accepted by the API.
 * @param {Object} rolesConfig - the roleTenantFilter object
 * @return {string} the internal roleTenantFilter string
 */
export const getInternalRoleScopes = (rolesConfig) => Object.entries(rolesConfig)
    .map(([role, value]) => {
        var roleID = mapToInternalRole(role);

        return roleID + ":" + value.join(",");
    }).join(";");

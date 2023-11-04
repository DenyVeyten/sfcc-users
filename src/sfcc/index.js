import {
    createAMUser,
    createLocalUser,
    getExistingAMUser,
    grantAMRole,
    undeleteAMUser,
    updateLocalUser,
} from "./user.js";
import { getInternalRoleScopes } from "./utils.js";

export { getAuthToken } from "./token.js";

export const createOrUpdateAMUser = async ({
    orgName,
    email,
    firstName,
    lastName,
    roles,
    instances,
    token,
}) => {
    const amUser = roles.length
        ? await grantAMRole(email, roles[0], instances, token)
        : await getExistingAMUser(orgName, email, token);

    if (amUser) {
        if (amUser.userState !== "DELETED") return amUser;

        return undeleteAMUser(email, token);
    }

    const rolesConfig = roles.length ? {
        roles,
        roleTenantFilter: getInternalRoleScopes({ [roles[0]]: instances }),
    } : {};

    const userDetails = {
        firstName,
        lastName,
        ...rolesConfig,
    };

    return createAMUser(orgName, userDetails, email, token);
};

export const createOrUpdateLocalUser = async ({
    id,
    email,
    firstName,
    lastName,
    instanceRoles,
    instance,
    token,
}) => {
    const rolesConfig = { roles: instanceRoles };

    const updatedUser = await updateLocalUser(instance, email, rolesConfig, token);

    if (updatedUser) return updatedUser;

    const userDetails = {
        external_id: id,
        first_name: firstName,
        last_name: lastName,
        email,
        ...rolesConfig,
    };

    return createLocalUser(instance, email, userDetails, token);
};

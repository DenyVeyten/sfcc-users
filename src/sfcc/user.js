import sfcc from "sfcc-ci";

export const getExistingAMUser = async (orgName, email, token) => {
    try {
        const result = await sfcc.user.list(orgName, null, email, null, null, token);

        return result[0];
    } catch (e) {
        // TODO: handle non-404 errors?
    }
};

export const grantAMRole = async (email, role, instances, token) => {
    try {
        const result = await sfcc.user.grant(email, role, instances.join(","), token);

        return result;
    } catch (e) {
        // TODO: handle non-404 errors?
    }
};

export const createAMUser = async (orgName, userDetails, email, token) => {
    try {
        const result = await sfcc.user.create(orgName, userDetails, email, null, null, token);

        return result;
    } catch (e) {
        // TODO: handle non-404 errors?
        console.error("Failed to create AM user", email);
        console.error(e.message);
    }
};

export const undeleteAMUser = async (email, token) => {
    try {
        const result = await sfcc.user.update(email, { userState: "INITIAL" }, token);

        return result[0];
    } catch (e) {
        // TODO: handle non-404 errors?
    }
};

export const updateLocalUser = async (instance, email, userDetails, token) => {
    try {
        const result = await sfcc.user.updateLocal(instance, email, userDetails, token);

        return result;
    } catch (e) {
        // TODO: handle non-404 errors?
    }
};

export const createLocalUser = async (instance, email, userDetails, token) => {
    try {
        const result = await sfcc.user.createLocal(instance, email, userDetails, token);

        return result;
    } catch (e) {
        // TODO: handle non-404 errors?
        //return e;
        console.error("Failed to create local user", email, "on instance", instance);
        console.error(e.message);
    }
};

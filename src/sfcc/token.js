import { exec } from "child_process";

export const getExistingToken = () => new Promise((resolve) => {
    if (process.env.NODE_ENV === "test") return resolve("42");

    exec("sfcc-ci client:auth:token", (err, stdout) => resolve(stdout.trim()));
});

export const authExec = () => new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") return resolve("42");

    exec("sfcc-ci client:auth", (err) => {
        if (err) return reject(err);

        return resolve(getExistingToken());
    });
});

const INFO_MSG = "Please, approve auth request via your MFA app (e.g. Salesforce Authenticator)";

const checkTokenExpiration = (token) => {
    const tokenParts = token.split(".");
    const isJWT = tokenParts.length === 3;

    if (!isJWT) return false;

    const payload = JSON.parse(Buffer.from(tokenParts[1], "base64").toString("utf-8"));
    const currentSeconds = Date.now() / 1000;

    return payload.exp > currentSeconds + 60;
};

export const getAuthToken = async () => {
    const existingToken = await getExistingToken();

    if (existingToken && checkTokenExpiration(existingToken)) return existingToken;

    setTimeout(() => console.info(INFO_MSG), 1000);

    const token = await authExec();

    console.info("Approved!");

    return token;
};

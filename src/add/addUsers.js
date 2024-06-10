import { getAuthToken, createOrUpdateAMUser, createOrUpdateLocalUser } from "../sfcc/index.js";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

export default async ({
    orgName,
    emails,
    instances,
    roles,
    instanceRoles,
}) => {
    if (!emails.length) return console.error("No emails found");

    const token = await getAuthToken();

    const amUsers = await Promise.allSettled(emails.map(async (email) => {
        const [first, ...rest] = email.split("@")[0].split(".");
        const firstName = capitalize(first);
        const lastName = capitalize(rest.join("") || first);

        const user = await createOrUpdateAMUser({
            orgName,
            email,
            firstName,
            lastName,
            roles,
            instances: instances.map((instance) => instance.shortcode),
            token,
        });

        if (!user) return;

        console.info("Created/updated AM user:", user.mail);

        return user;
    })).then((values) => values.map((v) => v.value));

    if (!instanceRoles.length) return;

    return Promise.allSettled(instances.map(async (instance) => {
        return Promise.all(amUsers.map(async ({ id, mail, firstName, lastName }) => {
            const localUser = await createOrUpdateLocalUser({
                id,
                email: mail,
                firstName,
                lastName,
                instanceRoles,
                instance: instance.hostname,
                token,
            });

            if (!localUser) return Promise.reject();

            console.info("Created/updated local user", mail, "on instance", instance.title);

            return localUser;
        })).catch();
    }));
};

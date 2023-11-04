import assert from "assert";

import { getFileContent, isEmail } from "./utils.js";

describe("Add user module utils", () => {
    describe("isEmail", () => {
        const validEmails = ["awd@awd.com", "awd.awd@gmail.com", "awd.awd.awd.awd@awd.awd.awd.com"];
        const invalidEmails = ["awd.awd.com", "awd.txt", "awd@awd@awd.com", "awd@awd"];

        it("should return true if email is valid", () => {
            validEmails.forEach((email) => {
                assert(isEmail(email));
            });
        });

        it("should return false if email is invalid", () => {
            invalidEmails.forEach((email) => {
                assert(isEmail(email) === false);
            });
        });
    });

    describe.skip("getFileContent", () => {
        const filePath = "awd.txt";

        it("should return content", () => {
            assert(getFileContent(filePath, true));
        });

        it("should return promise that resolves to content", () => {
            assert(getFileContent(filePath));
        });
    });
});

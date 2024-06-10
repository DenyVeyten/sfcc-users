import { getFileContent, isEmail } from "./utils.js";

describe("Add user module utils", () => {
    describe("isEmail", () => {
        const validEmails = ["awd@awd.com", "awd.awd@gmail.com", "awd.awd.awd.awd@awd.awd.awd.com"];
        const invalidEmails = ["awd.awd.com", "awd.txt", "awd@awd@awd.com", "awd@awd"];

        test("valid email", () => {
            validEmails.forEach((email) => {
                expect(isEmail(email)).toBe(true);
            });
        });

        test("invalid email", () => {
            invalidEmails.forEach((email) => {
                expect(isEmail(email)).toBe(false);
            });
        });
    });

    describe.skip("getFileContent", () => {
        const filePath = "awd.txt";

        test("file content", () => {
            expect(getFileContent(filePath, true)).toBe(true);
        });

        test("promise resolves to file content", () => {
            expect(getFileContent(filePath)).toBe(true);
        });
    });
});

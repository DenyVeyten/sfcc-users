import { getFileContent, isEmail } from "./utils.js";

describe("Add user module utils", () => {
    describe("isEmail", () => {
        const validEmails = ["awd@awd.com", "awd.awd@gmail.com", "awd.awd.awd.awd@awd.awd.awd.com"];
        const invalidEmails = ["awd.awd.com", "awd.txt", "awd@awd@awd.com", "awd@awd"];

        it("should return true if email is valid", () => {
            validEmails.forEach((email) => {
                expect(isEmail(email)).toBe(true);
            });
        });

        it("should return false if email is invalid", () => {
            invalidEmails.forEach((email) => {
                expect(isEmail(email)).toBe(false);
            });
        });
    });

    describe.skip("getFileContent", () => {
        const filePath = "awd.txt";

        it("should return content", () => {
            expect(getFileContent(filePath, true)).toBe(true);
        });

        it("should return promise that resolves to content", () => {
            expect(getFileContent(filePath)).toBe(true);
        });
    });
});

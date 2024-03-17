import { getHostname, hasValidHostname } from "./utils.js";

describe("Setup module utils", () => {
    const urls = ["awd.awd", "awd.awd/awd", "https://awd.awd/"];
    const expected = "awd.awd";

    describe("getHostname", () => {
        it("should return a hostname from an url", () => {
            urls.forEach((url) => {
                expect(getHostname(url)).toBe(expected);
            });
        });
    });

    describe("hasValidHostname", () => {
        const validHostnames = [
            "abcd-003.dx.commercecloud.salesforce.com",
            "development-ap01-nto.demandware.net",
            "http://example.com/",
            "awd@awd.com",
            "awd:awd@awd.com",
        ];
        const invalidHostnames = [
            "awd",
            "awd@awd",
            "/awd/awd",
        ];

        it("should return true if hostname is valid", () => {
            validHostnames.forEach((hostname) => {
                expect(hasValidHostname(hostname)).toBe(true);
            });
        });

        it("should return false if hostname is invalid", () => {
            invalidHostnames.forEach((hostname) => {
                expect(hasValidHostname(hostname)).toBe(false);
            });
        });
    });

});

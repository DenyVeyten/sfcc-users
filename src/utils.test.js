import { jest } from "@jest/globals";

const joinUniqueValue = {};
const urlUniqueValue = {};
const pathStub = { join: jest.fn().mockReturnValue(joinUniqueValue) };
const urlStub = { pathToFileURL: jest.fn().mockReturnValue(urlUniqueValue) };

jest.unstable_mockModule("path", () => pathStub);
jest.unstable_mockModule("url", () => urlStub);

const { toCwdFilePath, toCwdFileUrl } = await import("./utils.js");

describe("Global utils", () => {
    const filePaths = ["awd.txt", "../awd.txt", "awd/awd.txt"];

    describe("toCwdFilePath", () => {
        test("relative to process.cwd", async () => {
            filePaths.forEach((filePath) => {
                const result = toCwdFilePath(filePath);

                expect(result).toBe(joinUniqueValue);
                expect(pathStub.join).toHaveBeenCalledWith(process.cwd(), filePath);
            });
        });
    });

    describe("toCwdFileUrl", () => {
        test("relative to process.cwd", async () => {
            filePaths.forEach((filePath) => {
                const result = toCwdFileUrl(filePath);

                expect(result).toBe(urlUniqueValue);
                expect(urlStub.pathToFileURL).toHaveBeenCalledWith(urlUniqueValue);
            });
        });
    });
});

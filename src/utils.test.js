import assert from "assert/strict";
import quibble from "quibble";
import sinon from "sinon";

describe("Global utils", () => {
    const paths = ["awd.txt", "../awd.txt", "awd/awd.txt"];
    const joinUniqueValue = {};
    const urlUniqueValue = {};
    const pathStub = { join: sinon.stub().returns(joinUniqueValue) };
    const urlStub = { pathToFileURL: sinon.stub().returns(urlUniqueValue) };

    describe("toCwdFilePath", () => {
        beforeEach(async () => {
            await quibble.esm("path", pathStub, pathStub);
        });

        it("should return file path relative to process.cwd", async () => {
            const { toCwdFilePath } = await import("./utils.js");

            paths.forEach((path) => {
                const result = toCwdFilePath(path);

                assert.equal(result, joinUniqueValue, "returns result of path.join");
                assert.ok(pathStub.join.calledWith(process.cwd(), path));
            });
        });
    });

    describe("toCwdFileUrl", () => {
        beforeEach(async () => {
            await quibble.esm("path", pathStub, pathStub);
            await quibble.esm("url", urlStub, urlStub);
        });

        it("should return file URL relative to process.cwd", async () => {
            const { toCwdFileUrl } = await import("./utils.js");

            paths.forEach((path) => {
                const result = toCwdFileUrl(path);

                assert.equal(result, urlUniqueValue, "returns result of url.pathToFileURL");
                assert.ok(urlStub.pathToFileURL.calledWith(urlUniqueValue));
            });
        });
    });
});

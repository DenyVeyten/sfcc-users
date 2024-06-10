import { spawn } from "child_process";
import { RemoteHttpResolver } from "@mswjs/interceptors/RemoteHttpInterceptor";
import { baseCommands } from "./utils";

const mocks = {
    "/search/findByLogin/?login=": "get",
    "/v1/users/": "get",
    "/users/test.ex@awd.com": "get_local",
    // "search/findByLogin/?login=": "create",
};

describe("sfcc-users add command", () => {
    test("user creation", (done) => {
        const addProcess = spawn(
            "node",
            [...baseCommands, "-c=tests/mocks/sfcc-users.config.js", "add", "test.ex@awd.com"],
            {
                stdio: ["pipe", "pipe", "pipe", "ipc"]
                , env: { ...process.env, SFCC_ALLOW_SELF_SIGNED: true },
            },
        );

        addProcess.stdout.on("data", (data) => {
            if (data.includes("instances")) {
                expect(data.toString()).toEqual(expect.stringContaining("instances"));
                addProcess.stdin.write(" \n");
            }

            if (data.includes("AM role")) {
                addProcess.stdin.write(" \n");
            }

            if (data.includes("Additional local role")) {
                addProcess.stdin.write(" \n");
            }

            if (data.includes("Created/updated local user")) {
                expect(data.toString())
                    .toEqual(expect.stringContaining("Created/updated local user"));
                addProcess.stdin.end();
                addProcess.disconnect();
            }
        });

        addProcess.stderr.on("data", (data) => {
            expect(data.toString()).toEqual(expect.stringContaining("Warning"));
        });

        const resolver = new RemoteHttpResolver({ process: addProcess });

        resolver.apply();

        resolver.on("request", async ({ request }) => {
            const url = Object.keys(mocks).find(request.url.includes.bind(request.url));

            expect(url).not.toBeUndefined();

            const mockedResponse = await import(`../mocks/${mocks[url]}`);

            request.respondWith(
                new Response(
                    JSON.stringify(mockedResponse.default),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    },
                ),
            );
        });

        addProcess.on("exit", done);
    }, 3000);
});

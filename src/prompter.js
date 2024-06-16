import prompts from "prompts";

const onCancel = () => {
    process.nextTick(() => {
        console.warn("Terminated, exiting...");
        process.exit(0);
    });

    return false;
};

export default (questions, overrides) => {
    prompts.override(overrides);

    return prompts(questions, { onCancel });
};

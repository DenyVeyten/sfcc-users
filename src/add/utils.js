import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import { toCwdFilePath } from "../utils.js";

const EMAIL_REGEXP = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Validates whether a string looks like email
 * @param {string} str - string to validate
 * @returns {boolean} validation result
 */
export const isEmail = (str) => EMAIL_REGEXP.test(str);

/**
 * Provides file content or Promise that resolves to file content, relatively to CWD
 * @param {string} str - potential file path to use
 * @param {*} isSync - flag to use sync file read. TODO: required until this is fixed
 *  https://github.com/terkelg/prompts/issues/402
 * @returns {Buffer|Promise<Buffer>} file content or promise of it
 * @throws different errors
 */
export const getFileContent = (str, isSync) => {
    var fileURL = toCwdFilePath(str);

    return (isSync ? readFileSync : readFile)(fileURL);
};

/**
 * Validates whether comma-separated list of elements is valid emails or files
 * @param {string} source - comma-separated list of elements to validate
 * @returns {boolean} whether each element is valid or not
 */
export const validateSource = (source) => {
    try {
        return source.split(",").map((s) => {
            const str = s.trim();

            return isEmail(str) || getFileContent(str, true);
        }).every(Boolean);
    } catch (e) {
        return false;
    }
};

/**
 * Converts list of emails or files into list of emails
 * @param {Array<string>} source - list of emails or files
 * @returns {Array<string>} list of emails
 */
export const toEmails = async (source) => {
    // TODO: consider mix of emails and files
    if (isEmail(source[0])) return source;

    // TODO: allow reading from multiple files
    const content = await getFileContent(source[0]);

    return content.toString().split(/\r?\n/).filter(isEmail);
};

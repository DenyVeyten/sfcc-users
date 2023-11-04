import { join } from "path";
import { pathToFileURL } from "url";

/**
 * Resolves relative path relatively to cwd
 * @param {string} path - relative path to a file
 * @returns {string} absolute file path resolved to cwd
 * @throws {TypeError} if any of the path segments is not a string.
 */
export const toCwdFilePath = (path) => join(process.cwd(), path);

/**
 * Provides absolute file URL to be used for dynamic import
 * @param {string} path - relative path to a file
 * @returns absolute file path for import
 */
export const toCwdFileUrl = (path) => pathToFileURL(toCwdFilePath(path));

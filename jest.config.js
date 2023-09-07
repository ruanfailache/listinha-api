const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["./tests/jest.setup.ts"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>",
    }),
};

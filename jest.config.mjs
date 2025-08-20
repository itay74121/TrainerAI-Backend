import tsconfig from './tsconfig.json' with { type: 'json' };

// if you still need compilerOptions:
const { compilerOptions } = tsconfig;

/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: { '^.+\\.ts$': ['ts-jest', { useESM: true }] },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' }
};

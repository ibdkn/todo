import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

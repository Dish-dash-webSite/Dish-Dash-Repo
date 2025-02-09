import '@testing-library/jest-dom'; 

// Polyfill for TextEncoder and TextDecoder
import { TextEncoder, TextDecoder as UtilTextDecoder } from 'util';

// Cast TextDecoder to the expected type
global.TextEncoder = TextEncoder;
global.TextDecoder = UtilTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}; 
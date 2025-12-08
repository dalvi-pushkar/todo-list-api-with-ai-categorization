// Test setup file
import { taskStore } from '../src/lib/taskStore';

// Clear task store before each test
beforeEach(() => {
  taskStore.clear();
});

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

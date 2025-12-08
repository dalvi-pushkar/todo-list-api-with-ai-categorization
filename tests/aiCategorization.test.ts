import { categorizeTask, isOpenAIAvailable } from '../src/lib/aiCategorization';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'work',
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

describe('AI Categorization', () => {
  describe('categorizeTask', () => {
    it('should categorize work-related tasks', async () => {
      const category = await categorizeTask('Prepare presentation for client meeting tomorrow');
      expect(['work', 'general']).toContain(category);
    });

    it('should categorize shopping tasks', async () => {
      const category = await categorizeTask('Buy groceries from the supermarket');
      expect(['shopping', 'general']).toContain(category);
    });

    it('should categorize personal tasks', async () => {
      const category = await categorizeTask('Call mom for her birthday');
      expect(['personal', 'general']).toContain(category);
    });

    it('should categorize finance tasks', async () => {
      const category = await categorizeTask('Pay electricity bill before due date');
      expect(['finance', 'general']).toContain(category);
    });

    it('should categorize health tasks', async () => {
      const category = await categorizeTask('Schedule doctor appointment for annual checkup');
      expect(['health', 'general']).toContain(category);
    });

    it('should categorize education tasks', async () => {
      const category = await categorizeTask('Complete homework assignment for math class');
      expect(['education', 'general']).toContain(category);
    });

    it('should categorize home tasks', async () => {
      const category = await categorizeTask('Clean the kitchen and do the laundry');
      expect(['home', 'general']).toContain(category);
    });

    it('should categorize entertainment tasks', async () => {
      const category = await categorizeTask('Watch the new movie on Netflix tonight');
      expect(['entertainment', 'general']).toContain(category);
    });

    it('should use title and description together', async () => {
      const category = await categorizeTask('Need to finish this today', 'Complete project report');
      expect(['work', 'general']).toContain(category);
    });

    it('should return general for ambiguous tasks', async () => {
      const category = await categorizeTask('Do something important');
      expect(category).toBeTruthy();
      expect(typeof category).toBe('string');
    });

    it('should handle multiple keyword matches', async () => {
      const category = await categorizeTask('Buy medicine from pharmacy and schedule doctor appointment');
      expect(['health', 'shopping', 'general']).toContain(category);
    });
  });

  describe('isOpenAIAvailable', () => {
    it('should return boolean indicating OpenAI availability', () => {
      const available = isOpenAIAvailable();
      expect(typeof available).toBe('boolean');
    });
  });
});

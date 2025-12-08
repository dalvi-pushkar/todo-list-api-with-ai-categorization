import OpenAI from 'openai';

// Initialize OpenAI client (will be null if API key is not provided)
let openaiClient: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Keyword-based categorization fallback
const keywordCategories: Record<string, string[]> = {
  work: ['meeting', 'project', 'deadline', 'presentation', 'report', 'email', 'client', 'office', 'team', 'boss'],
  personal: ['family', 'friend', 'birthday', 'vacation', 'hobby', 'exercise', 'health', 'doctor', 'appointment'],
  shopping: ['buy', 'purchase', 'order', 'shopping', 'groceries', 'store', 'amazon', 'market'],
  finance: ['pay', 'bill', 'invoice', 'tax', 'budget', 'bank', 'money', 'payment', 'subscription'],
  health: ['doctor', 'hospital', 'medicine', 'exercise', 'gym', 'workout', 'diet', 'fitness', 'medical'],
  education: ['study', 'learn', 'course', 'class', 'homework', 'assignment', 'exam', 'school', 'university'],
  home: ['clean', 'repair', 'maintenance', 'garden', 'laundry', 'cook', 'dishes', 'organize'],
  entertainment: ['movie', 'game', 'book', 'music', 'concert', 'show', 'watch', 'play', 'read'],
};

function categorizeByKeywords(description: string): string {
  const lowerDescription = description.toLowerCase();
  
  // Count matches for each category
  const categoryScores: Record<string, number> = {};
  
  for (const [category, keywords] of Object.entries(keywordCategories)) {
    const matchCount = keywords.filter(keyword => 
      lowerDescription.includes(keyword)
    ).length;
    
    if (matchCount > 0) {
      categoryScores[category] = matchCount;
    }
  }
  
  // Return category with highest score
  if (Object.keys(categoryScores).length > 0) {
    return Object.entries(categoryScores).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];
  }
  
  return 'general';
}

// AI-powered categorization using OpenAI
export async function categorizeTask(description: string, title?: string): Promise<string> {
  const fullText = title ? `${title}: ${description}` : description;
  
  // Try OpenAI first if available
  if (openaiClient) {
    try {
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a task categorization assistant. Categorize tasks into one of these categories: work, personal, shopping, finance, health, education, home, entertainment, or general. Respond with only the category name in lowercase.',
          },
          {
            role: 'user',
            content: `Categorize this task: "${fullText}"`,
          },
        ],
        max_tokens: 10,
        temperature: 0.3,
      });
      
      const category = completion.choices[0]?.message?.content?.trim().toLowerCase();
      
      // Validate the category
      const validCategories = ['work', 'personal', 'shopping', 'finance', 'health', 'education', 'home', 'entertainment', 'general'];
      if (category && validCategories.includes(category)) {
        return category;
      }
    } catch (error) {
      console.warn('OpenAI categorization failed, falling back to keyword-based:', error);
    }
  }
  
  // Fallback to keyword-based categorization
  return categorizeByKeywords(fullText);
}

// Check if OpenAI is available
export function isOpenAIAvailable(): boolean {
  return openaiClient !== null;
}

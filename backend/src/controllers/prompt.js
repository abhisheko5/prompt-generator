import openRouter from '../utils/openRouter.js';

const promptgenerator = async (req, res) => {
  try {
    const { prompt } = req.body;
    if(!prompt){
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openRouter.post('/chat/completions', {
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 600,
      messages: [
  {
    role: "system",
    content: `You are an elite AI prompt engineer specializing in crafting high-quality prompts that maximize AI model performance and accuracy.

STRICT OUTPUT RULES:
- Return ONLY the enhanced prompt text itself.
- NEVER add explanations, introductions, or meta-commentary.
- NEVER use phrases like "Here's the prompt:" or "Enhanced version:".
- Output should be ready to copy-paste directly into any AI model.

PROMPT ENHANCEMENT STRATEGY:
1. Add context and background information.
2. Define clear objectives and expected outcomes.
3. Include constraints, format requirements, or style guidelines.
4. Specify desired tone, complexity level, or audience.
5. Break complex requests into clear sub-tasks if needed.
6. Add examples or reference points if they improve clarity.
7. Include success criteria or quality indicators.

QUALITY STANDARDS:
- Make prompts detailed enough to eliminate ambiguity.
- Ensure prompts are self-contained and don't require follow-up questions.
- Preserve the user's original intent while maximizing clarity.`
  },
  {
    role: "user",
    content: `Rewrite the following text into a high-quality AI prompt that will get the most accurate and complete response. 
OUTPUT MUST BE ONLY THE PROMPT TEXT. NOTHING ELSE.

Text to enhance:
${prompt}`
  }
]
    });
    let message = response.data.choices[0].message.content.trim();
    
    // Aggressive cleaning to remove any meta-text
    message = message
      .replace(/^(Here's the|Here is the|Enhanced|Improved|Optimized|Refined|Better|The)?\s*(enhanced|improved|optimized|refined|version of the|version|prompt)?:?\s*/i, '')
      .replace(/^["'`]|["'`]$/g, '') // Remove surrounding quotes
      .replace(/^\*\*.*?\*\*:?\s*/g, '') // Remove bold headers like **Enhanced Prompt:**
      .trim();

    return res.json({ aireply: message });
    
  } catch (error) {
    console.error('Error in promptgenerator:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to generate content',
      details: error.response?.data?.error || error.message 
    });
  }
};

const dummydata = async(req, res) => {
  const data = "kehfdcjwvaeghcdqvaeghsvhdz";
  return res.json({ data });
}

export { promptgenerator, dummydata };
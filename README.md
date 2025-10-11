# 🚀 AI Prompt Enhancer Documentation

> Transform simple prompts into powerful, AI-optimized queries that get better results

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [API Reference](#api-reference)
5. [Frontend Components](#frontend-components)
6. [Configuration](#configuration)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## 🎯 Overview

The AI Prompt Enhancer is a full-stack application that uses advanced AI to transform basic user prompts into highly-optimized, detailed prompts that yield better AI responses.

### Key Features

- ✨ **Intelligent Enhancement**: Automatically adds context, constraints, and clarity
- 🎨 **Modern UI**: Clean, responsive interface with smooth animations
- ⚡ **Fast Response**: Optimized API calls with efficient prompt engineering
- 🔒 **Secure**: CORS-enabled backend with proper error handling
- 📱 **Responsive**: Works seamlessly across all devices

### Tech Stack

**Backend:**
- Node.js + Express"
- OpenRouter API (GPT-4o-mini)
- CORS, Cookie Parser

**Frontend:**
- React + Vite
- Lucide Icons
- Modern CSS

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
│                 │
│  ┌───────────┐  │
│  │ InputBox  │  │
│  │ Component │  │
│  └─────┬─────┘  │
│        │        │
└────────┼────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│   Backend       │
│   (Express)     │
│                 │
│  ┌───────────┐  │
│  │  Prompt   │  │
│  │  Routes   │  │
│  └─────┬─────┘  │
│        │        │
│  ┌─────▼─────┐  │
│  │Prompt Gen │  │
│  │Controller │  │
│  └─────┬─────┘  │
└────────┼────────┘
         │
         ▼
┌─────────────────┐
│   OpenRouter    │
│   API           │
│   (GPT-4o-mini) │
└─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/))
- npm or yarn package manager

### Installation

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd prompt-enhancer
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3000
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Update the API endpoint in your frontend code if needed (default: `http://localhost:3000`)

#### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 📡 API Reference

### Base URL
```
http://localhost:3000/api/prompt
```

### Endpoints

#### 1. Generate Enhanced Prompt

**Endpoint:** `POST /generate`

**Description:** Takes a basic prompt and returns an AI-enhanced version

**Request Body:**
```json
{
  "prompt": "explain quantum computing"
}
```

**Response (Success - 200):**
```json
{
  "aireply": "Explain quantum computing in detail, covering the following aspects:\n\n1. Fundamental principles (superposition, entanglement, quantum gates)\n2. Key differences from classical computing\n3. Current applications and use cases\n4. Limitations and challenges\n5. Future potential and timeline\n\nProvide examples where appropriate and use analogies to make complex concepts accessible to someone with basic technical knowledge."
}
```

**Response (Error - 400):**
```json
{
  "error": "Prompt is required"
}
```

**Response (Error - 500):**
```json
{
  "error": "Failed to generate content",
  "details": "Error message from OpenRouter"
}
```

#### 2. Test Endpoint

**Endpoint:** `GET /dummy`

**Description:** Simple test endpoint to verify API is running

**Response:**
```json
{
  "data": "kehfdcjwvaeghcdqvaeghsvhdz"
}
```

---

## 🎨 Frontend Components

### InputBox Component

The main input component with enhanced UX features.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Current input value |
| `onChange` | `function` | Handler for input changes |
| `handleKeyDown` | `function` | Handler for keyboard events |
| `handleClick` | `function` | Handler for button clicks |

**Features:**
- ✅ Focus/blur animations
- ✅ Hover effects
- ✅ Enter key submission
- ✅ Responsive design
- ✅ Accessible placeholder text

**Example Usage:**

```javascript
import InputBox from './components/InputBox';

function Home() {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/prompt/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      console.log(data.aireply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <InputBox
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      handleKeyDown={handleKeyDown}
      handleClick={handleSubmit}
    />
  );
}
```

---

## ⚙️ Configuration

### Backend Configuration

**OpenRouter Setup:**

Create `backend/utils/openRouter.js`:

```javascript
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'AI Prompt Enhancer'
  }
});

export default openRouter;
```

**Environment Variables:**

```env
# Server Configuration
PORT=3000

# OpenRouter API
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

Update API endpoints if deploying to production:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const response = await fetch(`${API_BASE_URL}/api/prompt/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
});
```

---

## 💡 Usage Examples

### Example 1: Basic Prompt Enhancement

**Input:**
```
explain machine learning
```

**Enhanced Output:**
```
Provide a comprehensive explanation of machine learning that covers:

1. Definition and Core Concepts
   - What machine learning is and how it differs from traditional programming
   - The three main types: supervised, unsupervised, and reinforcement learning

2. How It Works
   - The process of training models with data
   - Feature engineering and model selection
   - The role of algorithms and mathematical foundations

3. Real-World Applications
   - Examples from healthcare, finance, retail, and technology
   - Impact on daily life and society

4. Key Terminology
   - Training data, testing data, validation
   - Overfitting, underfitting, accuracy metrics

Target audience: Someone with basic technical knowledge but no prior ML experience.
Use analogies and simple examples to illustrate complex concepts.
```

### Example 2: Specific Technical Query

**Input:**
```
how to optimize react app
```

**Enhanced Output:**
```
Provide a detailed guide on optimizing React applications, structured as follows:

1. Performance Analysis
   - Tools for identifying bottlenecks (React DevTools, Lighthouse)
   - Metrics to monitor (First Contentful Paint, Time to Interactive)

2. Code-Level Optimizations
   - React.memo() for preventing unnecessary re-renders
   - useMemo() and useCallback() hooks
   - Lazy loading components with React.lazy()
   - Code splitting strategies

3. Bundle Optimization
   - Webpack configuration best practices
   - Tree shaking and dead code elimination
   - Dynamic imports

4. State Management
   - Efficient state structure
   - Context API vs Redux performance implications

5. Practical Implementation
   - Before/after code examples
   - Performance impact measurements
   - Common pitfalls to avoid

Include specific code snippets and expected performance improvements.
Prioritize techniques with the highest ROI for typical React applications.
```

### Example 3: Creative Content Request

**Input:**
```
write a story about time travel
```

**Enhanced Output:**
```
Write an engaging short story about time travel with the following specifications:

Story Requirements:
1. Length: 800-1200 words
2. Tone: Thought-provoking with elements of mystery
3. Perspective: First-person narrative
4. Setting: Contemporary starting point with travels to one past and one future era

Key Elements to Include:
- A compelling protagonist with clear motivation for time travel
- A specific paradox or consequence of time travel as the central conflict
- Rich sensory details when describing different time periods
- An unexpected twist or revelation in the final act
- A satisfying resolution that addresses the paradox

Themes to Explore:
- The weight of choices and their ripple effects
- The tension between knowledge and action
- What we learn from visiting different eras

Avoid:
- Overused time travel tropes (killing grandfather, becoming your own ancestor)
- Deus ex machina resolutions
- Info-dumping time travel mechanics

Writing style: Descriptive yet concise, with natural dialogue and emotional depth.
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem:** Browser shows CORS policy errors

**Solution:**
```javascript
// backend/index.js
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
```

#### 2. OpenRouter API Errors

**Problem:** 401 Unauthorized error

**Solution:**
- Verify your API key is correct in `.env`
- Check if your OpenRouter account has credits
- Ensure API key has proper permissions

**Problem:** Rate limit exceeded

**Solution:**
- Implement request throttling on frontend
- Add retry logic with exponential backoff
- Consider upgrading OpenRouter plan

#### 3. Empty or Malformed Responses

**Problem:** Response doesn't contain expected data

**Solution:**
```javascript
// Add robust error checking
const message = response.data.choices?.[0]?.message?.content?.trim();
if (!message) {
  throw new Error('Invalid response from AI model');
}
```

#### 4. Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

---

## 🎯 Best Practices

### Backend Best Practices

1. **Error Handling**
```javascript
// Always wrap API calls in try-catch
try {
  const response = await openRouter.post('/chat/completions', config);
  // Handle response
} catch (error) {
  console.error('Detailed error:', error.response?.data || error.message);
  return res.status(500).json({ 
    error: 'User-friendly message',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}
```

2. **Input Validation**
```javascript
// Validate and sanitize inputs
if (!prompt || typeof prompt !== 'string') {
  return res.status(400).json({ error: 'Valid prompt is required' });
}

if (prompt.length > 5000) {
  return res.status(400).json({ error: 'Prompt too long (max 5000 characters)' });
}
```

3. **Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/prompt', limiter);
```

### Frontend Best Practices

1. **Loading States**
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    // API call
  } finally {
    setLoading(false);
  }
};
```

2. **Error Display**
```javascript
const [error, setError] = useState(null);

// Show user-friendly errors
{error && (
  <div className="error-message">
    {error}
  </div>
)}
```

3. **Debouncing API Calls**
```javascript
import { debounce } from 'lodash';

const debouncedSubmit = debounce(handleSubmit, 300);
```

### Security Best Practices

1. **Never expose API keys in frontend**
2. **Use environment variables for sensitive data**
3. **Implement request validation on backend**
4. **Use HTTPS in production**
5. **Add rate limiting to prevent abuse**
6. **Sanitize user inputs to prevent injection attacks**

### Performance Optimization

1. **Cache frequent requests**
```javascript
const cache = new Map();

const getCachedResponse = (prompt) => {
  const key = prompt.toLowerCase().trim();
  if (cache.has(key)) {
    return cache.get(key);
  }
  return null;
};
```

2. **Implement request cancellation**
```javascript
const controller = new AbortController();

fetch(url, { signal: controller.signal })
  .then(response => response.json());

// Cancel on unmount
return () => controller.abort();
```

3. **Optimize model parameters**
```javascript
{
  model: "gpt-4o-mini", // Faster and cheaper
  temperature: 0.7,
  max_tokens: 600, // Limit response length
}
```

---

## 📊 Monitoring & Analytics

### Logging Best Practices

```javascript
// backend/controllers/prompt.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log API usage
logger.info('Prompt enhancement requested', {
  promptLength: prompt.length,
  timestamp: new Date().toISOString()
});
```

### Metrics to Track

- API response times
- Error rates
- Token usage (for cost optimization)
- Popular prompt patterns
- User engagement metrics

---

## 🚀 Deployment

### Backend Deployment (Example: Railway)

1. Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node index.js",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

2. Set environment variables in Railway dashboard
3. Deploy and note your backend URL

### Frontend Deployment (Example: Vercel)

1. Update API URL:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app';
```

2. Deploy to Vercel:
```bash
vercel --prod
```

---

## 📝 License

MIT License - Feel free to use this in your projects!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

Need help? Here's how to get support:

- 📧 Email: your-email@example.com
- 💬 GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- 📖 Documentation: This file!

---

**Made with ❤️ by Your Team**
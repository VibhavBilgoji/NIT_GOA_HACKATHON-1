# AI Integration Setup Guide for CityPulse - Google Gemini 1.5

## Overview

CityPulse now includes AI-powered issue categorization using **Google Gemini 1.5** to help users report civic issues more efficiently. The system uses Gemini's advanced language understanding to automatically analyze issue descriptions and suggest appropriate categories and priorities.

## Features

✅ **Automatic Categorization** - AI suggests the best category for your issue
✅ **Priority Detection** - Determines urgency based on description
✅ **Smart Suggestions** - Improves titles and adds relevant tags
✅ **Confidence Scoring** - Shows how confident the AI is in its suggestion
✅ **Manual Override** - Users can always choose their own category
✅ **Fallback System** - Works even without AI (rule-based categorization)
✅ **Fast & Cost-Effective** - Gemini 1.5 Flash is extremely fast and affordable

## Setup Instructions

### Step 1: Get a Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select **"Create API key in new project"** or choose an existing project
5. Copy the API key immediately (starts with `AI...`)

**Note:** Gemini API is FREE for up to 1,500 requests per day (60 requests per minute)!

### Step 2: Add to Environment Variables

Create or edit `.env.local` in your project root:

```bash
# Google Gemini AI Configuration
GEMINI_API_KEY=AIza...your-key-here
GEMINI_MODEL=gemini-1.5-flash
```

**Models Available:**
- `gemini-1.5-flash` - Fast and cost-effective (recommended)
- `gemini-1.5-pro` - More capable for complex analysis

**Important:** Never commit your `.env.local` file to git!

### Step 3: Test the Integration

```bash
# Start the development server
npm run dev

# Open browser to http://localhost:3000/report

# Test the AI categorization:
1. Enter a title: "Large pothole on Main Street"
2. Enter description: "There's a dangerous crater in the middle of the road"
3. Click the "AI Suggest" button (with sparkle icon ✨)
4. See the AI suggestion appear with confidence score
5. Choose to apply it or select manually
```

## How It Works

### User Flow

1. **User enters issue details** → Title and description in the report form
2. **User clicks "AI Suggest"** → System sends data to `/api/ai/categorize`
3. **Gemini analyzes the text** → Gemini 1.5 Flash processes the issue
4. **Suggestion appears** → Blue alert box shows category, priority, confidence
5. **User decides** → Can apply suggestion or choose manually

### Technical Flow

```
Report Form (Client)
    ↓
POST /api/ai/categorize
    ↓
AI Service (lib/ai/service.ts)
    ↓
Google Gemini API (1.5 Flash)
    ↓
Response Processing
    ↓
Display Suggestion to User
```

## AI Prompts

### System Prompt (Categorization)

The AI is trained with context about:
- All 10 issue categories (pothole, streetlight, garbage, water_leak, etc.)
- Priority levels (critical, high, medium, low)
- Goa-specific context (coastal region, monsoon, tourism)
- Expected JSON response format

### User Prompt Format

```
Please analyze this civic issue report and categorize it:

Title: [User's title]
Description: [User's description]
Location: [Ward/district if provided]

Provide your analysis in JSON format.
```

### AI Response Format

```json
{
  "category": "pothole",
  "priority": "high",
  "confidence": 0.95,
  "reasoning": "Clear indication of a road pothole requiring urgent attention",
  "suggestedTitle": "Urgent: Large pothole on Main Street",
  "tags": ["road_safety", "urgent", "main_road"]
}
```

## Cost Estimate (FREE Tier)

Google Gemini 1.5 Flash has a **generous free tier**:

| Tier | Requests per Day | Requests per Minute | Cost |
|------|-----------------|---------------------|------|
| **Free** | 1,500 | 60 | **$0.00** |
| Paid | Unlimited | Higher limits | Very low cost |

**Perfect for CityPulse!** Most civic reporting apps won't exceed the free tier limits.

### Paid Pricing (if needed)
- **Input:** $0.075 per 1M tokens (much cheaper than OpenAI!)
- **Output:** $0.30 per 1M tokens

**Estimated cost per request:** < $0.00005 (even cheaper than OpenAI!)

## Fallback Mechanism

If AI is unavailable (no API key, error, rate limit), the system automatically falls back to keyword-based categorization:

- **Pothole**: "pothole", "crater", "hole in road"
- **Streetlight**: "street light", "lamp", "dark"
- **Garbage**: "garbage", "trash", "waste", "bin"
- **Water Leak**: "water leak", "pipe burst", "leaking"
- And more...

This ensures the app works even without AI configuration.

## Security Best Practices

### ✅ DO

- Store API key in `.env.local` (development)
- Use environment variables in production (Vercel/Netlify secrets)
- Add `.env.local` to `.gitignore`
- Rotate API keys periodically
- Monitor usage in [Google AI Studio](https://aistudio.google.com/)

### ❌ DON'T

- Commit API keys to git
- Share keys in public channels
- Hardcode keys in source files
- Use same key for dev and production
- Expose keys in client-side code

## Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - Name: `GEMINI_API_KEY`
   - Value: `AIza...your-key-here`
   - Environment: Production, Preview, Development (as needed)
4. Redeploy your app

### Netlify

1. Go to Site settings → Build & deploy → Environment
2. Add variable:
   - Key: `GEMINI_API_KEY`
   - Value: `AIza...your-key-here`
3. Redeploy

### Other Platforms

Most platforms support environment variables. Check their documentation for specific instructions.

## Testing Examples

### Test Case 1: Pothole
```
Title: "Big hole in the road"
Description: "There's a large crater on Main Street causing vehicles to swerve"
Expected: category="pothole", priority="high"
```

### Test Case 2: Streetlight
```
Title: "Dark street"
Description: "The street light near the park has been off for a week"
Expected: category="streetlight", priority="medium"
```

### Test Case 3: Critical Water Leak
```
Title: "Pipe burst"
Description: "Water is gushing from underground pipe, flooding the entire road"
Expected: category="water_leak", priority="critical"
```

### Test Case 4: Garbage
```
Title: "Overflowing bin"
Description: "The dustbin near market has been overflowing for days with bad smell"
Expected: category="garbage", priority="medium"
```

## API Endpoints

### POST /api/ai/categorize

Categorize an issue using AI.

**Request:**
```json
{
  "title": "Broken street light",
  "description": "The light has been off for days",
  "location": "Panjim - Fontainhas"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Issue categorized successfully",
  "data": {
    "category": "streetlight",
    "priority": "medium",
    "confidence": 0.92,
    "reasoning": "Clear streetlight maintenance issue",
    "suggestedTitle": "Non-functional street light - Off for days",
    "tags": ["lighting", "maintenance", "safety"]
  }
}
```

### GET /api/ai/categorize

Check if AI service is configured and available.

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "message": "AI categorization service is available"
  }
}
```

## Troubleshooting

### Problem: "AI service is not configured"

**Solution:** 
1. Check if `GEMINI_API_KEY` is set in `.env.local`
2. Restart the development server (`npm run dev`)
3. Verify the key is valid (starts with `AIza`)

### Problem: API key not working

**Solutions:**
- Verify you copied the complete key from Google AI Studio
- Check if the key has proper permissions
- Make sure API is enabled in your Google Cloud project
- Try generating a new key

### Problem: AI suggestions are wrong

**Solutions:**
- Encourage users to write clearer descriptions
- Add more context (location, severity, timing)
- Review the system prompt in `lib/ai/service.ts`
- Consider switching to `gemini-1.5-pro` for better accuracy

### Problem: Slow responses

**Possible causes:**
- Network latency
- Using `gemini-1.5-pro` instead of `flash`
- Large descriptions

**Solutions:**
- Use `gemini-1.5-flash` for faster responses (already default)
- Add loading indicators (already implemented)
- Optimize prompt length

### Problem: Rate limit errors (Free tier)

**Free tier limits:**
- 1,500 requests per day
- 60 requests per minute

**Solutions:**
1. Monitor usage in Google AI Studio dashboard
2. Implement request caching for similar issues
3. Upgrade to paid tier if needed (very affordable)
4. Add rate limiting on your API endpoint

## Why Gemini 1.5 Over OpenAI?

### ✅ Advantages

1. **Free Tier** - 1,500 requests/day absolutely free
2. **Faster** - Gemini Flash is optimized for speed
3. **Cheaper** - Even paid tier is more affordable
4. **Longer Context** - Can handle more text if needed
5. **No Credit Card** - Free tier doesn't require payment info
6. **Google Integration** - Works seamlessly with Google ecosystem

### Comparison

| Feature | Gemini 1.5 Flash | OpenAI GPT-4o-mini |
|---------|------------------|-------------------|
| Free Tier | 1,500 req/day | Limited trial only |
| Speed | Very fast | Fast |
| Cost (paid) | $0.075/1M input | $0.15/1M input |
| Context Window | 1M tokens | 128K tokens |
| JSON Mode | ✅ Native | ✅ Native |

## File Structure

```
NIT_GOA_HACKATHON/
├── lib/
│   └── ai/
│       └── service.ts              # Gemini AI service
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── categorize/
│   │           └── route.ts        # API endpoint
│   └── report/
│       └── page.tsx                # UI with AI integration
├── docs/
│   └── AI_INTEGRATION.md           # Detailed docs
├── .env.example                     # Template with Gemini vars
└── AI_SETUP_README.md              # This file
```

## Key Functions

### `categorizeIssue(request)`
Main function that sends issue data to Gemini and returns categorization.

**Location:** `lib/ai/service.ts`

### `handleAICategorization()`
Client-side function that calls the AI API and displays results.

**Location:** `app/report/page.tsx`

### `POST /api/ai/categorize`
API endpoint that validates input and calls AI service.

**Location:** `app/api/ai/categorize/route.ts`

## Gemini-Specific Features

### JSON Mode
Gemini natively supports JSON output via `responseMimeType: "application/json"` - no need for post-processing!

### Temperature Control
Set to 0.3 for consistent categorization (same as OpenAI approach).

### Retry Logic
Built-in exponential backoff for handling temporary failures.

## Future Enhancements

The codebase includes ready-to-use functions for:

1. **Duplicate Detection** - Check if issue already exists
2. **Image Analysis** - Analyze uploaded photos (Gemini supports vision!)
3. **Location Enhancement** - Improve location descriptions
4. **Sentiment Analysis** - Detect urgency from tone

These are implemented in `lib/ai/service.ts` but not yet integrated into the UI.

## Support & Resources

**Official Documentation:**
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Gemini Pricing](https://ai.google.dev/pricing)

**For Issues:**
1. Check the code comments in `lib/ai/service.ts`
2. Review Gemini API documentation
3. Open a GitHub issue
4. Contact the development team

---

**Model Used:** Google Gemini 1.5 Flash
**Free Tier:** 1,500 requests/day (FREE!)
**Cost (Paid):** < $0.00005 per request
**Response Time:** < 1 second typical
**Fallback:** Rule-based categorization

**Last Updated:** 2024

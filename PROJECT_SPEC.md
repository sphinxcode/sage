# SAGE - AI-Powered Human Design Companion
## 3-Hour MVP Project Specification

---

## 🎯 Mission Statement

Build SAGE to be **5x superior** to Bella AI by combining advanced automation, professional-grade features, and superior user experience into a comprehensive Human Design companion that serves both beginners and practitioners.

---

## 🔍 Competitive Analysis

### Bella AI (Current Market Leader)
**Strengths:**
- AI-powered chart interpretation with 100% accuracy claims
- 30+ language support
- Customizable depth based on knowledge level
- 55,000+ celebrity chart database

**Limitations:**
- Question limits (15-150/month based on plan)
- Static Q&A format without real-time automation
- Limited mobile experience (webview only)
- No advanced professional features (composite charts, returns, transits)
- Basic profile management and settings
- No real-time notifications or daily guidance automation

### SAGE's 5x Competitive Advantages

#### 1. **Advanced Automation & Real-Time Experience**
- **n8n-powered workflows** for daily transits, weekly strategies, and personalized reminders
- **Real-time typing animations** creating natural conversation flow
- **Unlimited AI interactions** through automation (no question limits)
- **Proactive guidance** vs reactive Q&A only

#### 2. **Professional-Grade Features**
- **Complete chart analysis** including all 50+ Human Design data points
- **Transit notifications** with real-time planetary impact analysis
- **Composite charts** for relationship compatibility
- **Return charts** (Solar, Saturn, Uranus, Chiron)
- **Professional dashboard** for practitioners

#### 3. **Superior User Experience**
- **Claude-inspired interface** with clean, intuitive design
- **Multi-step onboarding** with guided chart setup
- **Real-time chart visualization** integrated with AI chat
- **Responsive mobile-first** design (not webview)
- **Session-based conversations** with natural flow

#### 4. **Advanced Data & Privacy Controls**
- **Comprehensive settings** (Edit Profile, Chart Updates, AI Config)
- **Data export** in multiple formats (JSON, PDF, CSV)
- **Privacy controls** with granular permissions
- **Account management** with clear deletion options
- **Notification preferences** with detailed customization

#### 5. **Enhanced AI Contextualization**
- **Full chart context** in every AI response
- **Personalized daily guidance** based on transits
- **Long-term pattern recognition** through n8n workflows
- **Contextual prompts** that evolve with user interaction
- **Professional interpretations** from experienced practitioners

---

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** n8n automation workflows (webhook-driven)
- **Database:** Supabase (PostgreSQL with auth)
- **Deployment:** Railway
- **AI:** OpenAI (via n8n workflows)
- **External APIs:** humandesign.ai API for chart generation

### Architecture Flow
```
User Input → Next.js Frontend → Webhook to n8n → 
OpenAI Processing → Chart Data Context → 
AI Response → Webhook Back → Real-time UI Update
```

### Key Architectural Decisions
1. **Frontend as UI Wrapper:** Website serves as beautiful interface, all logic in n8n
2. **Webhook-Driven:** All AI interactions flow through n8n automation
3. **Session-Based Memory:** Chat history per session, no cross-session memory
4. **Real-time Updates:** WebSocket-style updates for typing animations
5. **API-First:** humandesign.ai API for accurate chart generation

---

## 📊 Database Schema

### Core Tables

#### users
```sql
id (uuid, primary key)
email (text, unique)
created_at (timestamp)
updated_at (timestamp)
onboarding_completed (boolean)
subscription_tier (text)
```

#### human_design_profiles
```sql
id (uuid, primary key)
user_id (uuid, foreign key)
-- Basic Info
name (text)
birthdate (date)
birthtime (time)
location (text)
-- Core Design
type (text)
profile (text)
strategy (text)
authority (text)
-- Advanced Fields (JSON objects)
channels_short (jsonb)
centers (jsonb)
incarnation_cross (text)
definition (text)
signature (text)
not_self_theme (text)
cognition (text)
determination (text)
variables (jsonb)
motivation (text)
transference (text)
perspective (text)
distraction (text)
circuitries (jsonb)
channels_long (jsonb)
gates (jsonb)
-- Planetary Positions
design_sun (text)
design_earth (text)
design_north_node (text)
design_south_node (text)
design_moon (text)
design_mercury (text)
design_venus (text)
design_mars (text)
design_jupiter (text)
design_saturn (text)
design_uranus (text)
design_neptune (text)
design_pluto (text)
personality_sun (text)
personality_earth (text)
personality_north_node (text)
personality_south_node (text)
personality_moon (text)
personality_mercury (text)
personality_venus (text)
personality_mars (text)
personality_jupiter (text)
personality_saturn (text)
personality_uranus (text)
personality_neptune (text)
personality_pluto (text)
created_at (timestamp)
updated_at (timestamp)
```

#### chat_sessions
```sql
id (uuid, primary key)
user_id (uuid, foreign key)
session_name (text)
created_at (timestamp)
updated_at (timestamp)
is_active (boolean)
```

#### chat_messages
```sql
id (uuid, primary key)
session_id (uuid, foreign key)
user_id (uuid, foreign key)
content (text)
role (text) -- 'user' or 'assistant'
created_at (timestamp)
metadata (jsonb) -- for additional context
```

#### user_settings
```sql
id (uuid, primary key)
user_id (uuid, foreign key)
-- Notification Settings
transit_notifications (boolean)
daily_guidance (boolean)
weekly_strategy (boolean)
email_notifications (boolean)
-- AI Configuration
response_depth (text) -- 'beginner', 'intermediate', 'advanced'
focus_areas (jsonb) -- ['relationships', 'career', 'health']
-- Appearance
theme (text) -- 'light', 'dark', 'auto'
language (text)
-- Privacy
data_sharing (boolean)
analytics_tracking (boolean)
created_at (timestamp)
updated_at (timestamp)
```

#### webhook_logs
```sql
id (uuid, primary key)
user_id (uuid, foreign key)
webhook_type (text)
payload (jsonb)
response (jsonb)
status (text)
created_at (timestamp)
```

---

## 🚀 3-Hour MVP Implementation Plan

### Hour 1: Foundation & Setup (60 min)

#### Next.js Project Setup (15 min)
```bash
npx create-next-app@latest sage --typescript --tailwind --eslint
cd sage
npx shadcn-ui@latest init
```

#### Core Dependencies (10 min)
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install lucide-react react-hook-form @hookform/resolvers/zod zod
npm install date-fns uuid
npm install framer-motion # for animations
```

#### Supabase Setup (15 min)
- Create Supabase project
- Set up authentication
- Create database tables with provided schema
- Configure RLS policies

#### Project Structure (10 min)
```
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── onboarding/
│   └── api/
├── components/
│   ├── ui/ (shadcn)
│   ├── chat/
│   └── forms/
├── lib/
│   ├── supabase.ts
│   ├── types.ts
│   └── utils.ts
└── hooks/
```

#### Basic Layout & Routing (10 min)
- Landing page
- Auth pages (sign-in/up)
- Dashboard layout with sidebar
- Protected route middleware

### Hour 2: Core Features (60 min)

#### Authentication Flow (20 min)
- Supabase auth integration
- Sign-up/sign-in forms with validation
- Protected route wrapper
- User session management

#### Onboarding Process (25 min)
- Multi-step wizard component
- Birth data collection form
- Location geocoding integration
- humandesign.ai API integration for chart generation
- Profile setup completion

#### Chat Interface Foundation (15 min)
- Chat UI components (message bubbles, input)
- Real-time typing animation component
- Session management
- Basic webhook endpoint structure

### Hour 3: Integration & Polish (60 min)

#### n8n Webhook Integration (25 min)
- `/api/webhooks/chat` endpoint
- `/api/webhooks/user-data` endpoint
- `/api/webhooks/transit-updates` endpoint
- Webhook security with API keys
- Real-time message updates

#### User Settings & Configuration (20 min)
- Settings page with all categories:
  - Edit Profile
  - Chart View & Update
  - AI Configuration (depth, focus areas)
  - Notifications (transits, daily, weekly)
  - Appearance (theme, language)
  - Data & Privacy (export, clear memory, delete account)
  - Support (help, contact)

#### Final Polish & Deployment (15 min)
- Error boundaries and loading states
- Basic responsive design
- Railway deployment configuration
- Environment variables setup

---

## 🎨 UI/UX Design System

### Design Philosophy
**Claude-Inspired Interface:** Clean, minimal, conversation-focused design that puts the AI interaction at the center while maintaining professional credibility for Human Design practitioners.

### Color Palette
```css
/* Primary - Professional Purple/Blue */
--primary: 258 90% 66%        /* #6366f1 - Modern indigo */
--primary-foreground: 210 40% 98%

/* Secondary - Warm Accent */
--secondary: 210 40% 96%
--secondary-foreground: 222.2 84% 4.9%

/* Human Design Specific */
--hd-defined: 142 76% 36%     /* Green for defined centers */
--hd-undefined: 0 0% 90%      /* Light gray for undefined */
--hd-channel: 258 90% 66%     /* Purple for active channels */
--hd-gate: 25 95% 53%         /* Orange for gates */
```

### Typography
- **Headers:** Inter, 600-800 weight
- **Body:** Inter, 400-500 weight  
- **Code/Data:** JetBrains Mono

### Component Design Principles
1. **Conversation First:** Chat interface takes 70% of screen real estate
2. **Contextual Chart:** Human Design chart visible in sidebar/overlay
3. **Progressive Disclosure:** Advanced features hidden until needed
4. **Accessibility:** WCAG 2.1 AA compliance
5. **Mobile First:** Responsive design with touch-friendly interactions

---

## 🔧 Comprehensive Settings Architecture

### 1. Edit Profile
- **Personal Information:** Name, email, birth details
- **Chart Information:** View full chart data, manual corrections
- **Profile Photo:** Avatar upload and management
- **Account Verification:** Email verification status

### 2. Chart View & Update
- **Chart Display Options:** Layout preferences, color schemes
- **Chart Data:** View all 50+ Human Design fields
- **Update Chart:** Re-generate from humandesign.ai API
- **Chart History:** Track any updates or corrections
- **Export Chart:** PDF, PNG, SVG formats

### 3. AI Configuration
- **Response Depth:** Beginner, Intermediate, Advanced, Expert
- **Focus Areas:** Relationships, Career, Health, Spirituality, Business
- **Conversation Style:** Casual, Professional, Therapeutic
- **Context Preferences:** Include transits, include chart details, reference level
- **Language:** 30+ languages (matching/exceeding Bella AI)

### 4. Notifications
- **Transit Notifications:** 
  - Real-time gate activations
  - Channel completions
  - Significant planetary movements
  - Personal transits (returns, significant aspects)
- **Daily Guidance:** Morning inspiration, evening reflection
- **Weekly Strategy:** Sunday planning sessions
- **Milestone Reminders:** Birthdays, returns, significant dates
- **Delivery Preferences:** Push, email, in-app only

### 5. Appearance
- **Theme:** Light, Dark, Auto (system), Human Design themed
- **Layout:** Sidebar left/right, compact/spacious
- **Chart Visualization:** Traditional, modern, minimal
- **Font Size:** Accessibility scaling
- **Color Customization:** Center colors, channel colors

### 6. Data & Privacy
- **Data Export:**
  - Complete profile (JSON)
  - Chart data (CSV)
  - Chat history (TXT/JSON)
  - Settings backup (JSON)
- **Privacy Controls:**
  - Data sharing preferences
  - Analytics opt-out
  - Third-party integrations
- **Memory Management:**
  - Clear chat history
  - Reset AI context
  - Archive old sessions
- **Account Management:**
  - Download all data
  - Delete account (with confirmation)
  - Account suspension options

### 7. Support
- **Help Center:** Searchable knowledge base
- **Contact Support:** In-app messaging, email
- **Feature Requests:** Voting system for new features
- **Bug Reports:** Integrated feedback system
- **Community:** Links to forums, social media
- **Video Tutorials:** Embedded learning content

---

## 🔗 API Specifications

### Internal API Routes

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/user` - Get current user

#### Profile Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/profile/chart` - Generate chart from birth data
- `GET /api/profile/chart` - Get saved chart data

#### Chat System
- `GET /api/chat/sessions` - List user's chat sessions
- `POST /api/chat/sessions` - Create new chat session
- `GET /api/chat/sessions/[id]/messages` - Get session messages
- `DELETE /api/chat/sessions/[id]` - Delete chat session

#### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings
- `POST /api/settings/export` - Export user data

### Webhook Endpoints (for n8n)

#### Incoming from n8n
- `POST /api/webhooks/chat` - Receive AI responses
  ```json
  {
    "session_id": "uuid",
    "user_id": "uuid", 
    "message": "AI response text",
    "metadata": {
      "response_time": 1200,
      "tokens_used": 150,
      "context_included": ["chart", "transits"]
    }
  }
  ```

- `POST /api/webhooks/user-data` - Receive external data
  ```json
  {
    "user_id": "uuid",
    "data_type": "transit_notification|daily_guidance|weekly_strategy",
    "content": "...",
    "timestamp": "ISO 8601"
  }
  ```

#### Outgoing to n8n
- `POST [n8n-webhook-url]/user-message` - Send user chat message
  ```json
  {
    "user_id": "uuid",
    "session_id": "uuid",
    "message": "User message text",
    "chart_context": { /* full HD profile */ },
    "user_settings": { /* AI preferences */ }
  }
  ```

### External API Integration

#### humandesign.ai API
- `POST /api/external/generate-chart` - Proxy to humandesign.ai
  ```json
  {
    "name": "John Doe",
    "birthdate": "1985-06-15",
    "birthtime": "14:30",
    "location": "New York, NY"
  }
  ```

---

## 🚢 Railway Deployment Configuration

### Environment Variables
```bash
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI & External APIs  
OPENAI_API_KEY=sk-your-openai-key
HUMANDESIGN_AI_API_KEY=your-hd-api-key

# n8n Integration
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com
WEBHOOK_SECRET=your-webhook-secret

# App Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.railway.app
NODE_ENV=production
```

### Railway Setup Commands
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link project
railway login
railway link

# Set environment variables
railway variables set SUPABASE_URL=https://your-project.supabase.co
railway variables set SUPABASE_ANON_KEY=your-anon-key
# ... (set all variables)

# Deploy
railway up
```

### Production Configuration

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

#### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  })
}
```

---

## 📈 Success Metrics & KPIs

### User Engagement
- **Daily Active Users (DAU):** Target 10x improvement over traditional HD apps
- **Session Duration:** Target 15+ minutes (vs 3-5 for Bella AI)
- **Messages per Session:** Target 20+ meaningful interactions
- **Return Rate:** 80% 7-day retention, 60% 30-day retention

### Technical Performance
- **Page Load Speed:** <2s initial load, <500ms navigation
- **API Response Time:** <200ms average, <1s 99th percentile
- **Webhook Processing:** <100ms end-to-end n8n integration
- **Uptime:** 99.9% availability target

### Competitive Advantage Metrics
- **Feature Completeness:** 5x more features than Bella AI
- **User Satisfaction:** Net Promoter Score >70
- **Professional Adoption:** 40% of users using advanced features
- **Data Richness:** 50+ HD data points vs 20 for competitors

### Revenue Targets
- **Freemium Conversion:** 15% free to paid conversion
- **Professional Tier Adoption:** 25% of paid users
- **Monthly Recurring Revenue:** $10k within 6 months
- **Customer Acquisition Cost:** <$50 per user

---

## 🔮 Future Roadmap

### Phase 2 (Weeks 2-4)
- **Advanced Chart Features:** Composite charts, return charts
- **Transit System:** Real-time planetary tracking
- **Mobile App:** React Native with full feature parity
- **Professional Dashboard:** Tools for HD practitioners

### Phase 3 (Months 2-3)
- **Community Features:** User forums, chart sharing
- **Educational Content:** Guided learning paths
- **Integration Marketplace:** Connect with astrology apps
- **Advanced Analytics:** Usage insights, pattern recognition

### Phase 4 (Months 4-6)
- **White Label Solution:** For HD practitioners
- **API Access:** Developer platform
- **Advanced AI Features:** Predictive insights, pattern analysis
- **Enterprise Features:** Team charts, organization insights

---

## ✅ MVP Completion Checklist

### Technical Implementation
- [ ] Next.js 14 project with TypeScript
- [ ] Supabase authentication & database
- [ ] Complete database schema implementation
- [ ] Chat interface with real-time animations
- [ ] Webhook endpoints for n8n integration
- [ ] humandesign.ai API integration
- [ ] Comprehensive settings system
- [ ] Railway deployment configuration

### User Experience
- [ ] Landing page with clear value proposition
- [ ] Smooth onboarding flow
- [ ] Professional chat interface
- [ ] Responsive design (mobile + desktop)
- [ ] Error handling and loading states
- [ ] Data export functionality
- [ ] Account management features

### Competitive Features
- [ ] Unlimited AI interactions (vs question limits)
- [ ] Full chart context in conversations
- [ ] Professional-grade settings
- [ ] Advanced privacy controls
- [ ] Real-time typing animations
- [ ] Session-based chat organization
- [ ] Comprehensive data management

---

## 🎯 Launch Strategy

### Soft Launch (Week 1)
- **Beta Users:** 50 Human Design enthusiasts
- **Feedback Collection:** In-app surveys, user interviews
- **Performance Monitoring:** Technical metrics, user behavior
- **Iteration:** Daily improvements based on feedback

### Public Launch (Week 2)
- **Marketing:** Social media, Human Design communities
- **Content:** Demo videos, feature comparisons
- **PR:** Reach out to Human Design influencers
- **Partnerships:** Connect with HD practitioners

### Growth (Weeks 3-4)
- **Referral Program:** Incentivize user sharing
- **Content Marketing:** Blog posts, tutorials
- **SEO Optimization:** Target Human Design keywords
- **Paid Acquisition:** Targeted ads to HD audiences

---

*This specification positions SAGE as the definitive Human Design companion app, delivering professional-grade features, superior user experience, and unlimited AI guidance through advanced n8n automation. The 3-hour MVP provides a solid foundation for rapid iteration and market dominance.*
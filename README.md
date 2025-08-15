# SAGE - AI-Powered Human Design Companion

🌟 **5x Superior to Any Human Design App** - Experience unlimited AI interactions, real-time chart analysis, and professional-grade features with automated daily guidance through advanced n8n workflows.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Railway account (for deployment)

### 1. Clone & Install
```bash
git clone [your-repo-url]
cd sage
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Setup Database
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and run the entire `supabase-schema.sql` file

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

```
User Input → Next.js Frontend → Webhook to n8n → 
OpenAI Processing → Chart Data Context → 
AI Response → Webhook Back → Real-time UI Update
```

### Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: n8n automation workflows (webhook-driven)
- **Database**: Supabase (PostgreSQL with auth)
- **Deployment**: Railway
- **AI**: OpenAI (via n8n workflows)
- **External APIs**: humandesign.ai API for chart generation

## ✨ Features

### 🔄 Advanced Automation
- Real-time transit notifications
- Personalized daily guidance through n8n workflows
- Automated weekly strategy sessions

### 💬 Unlimited AI Chat
- No question limits
- Full chart context in every conversation
- Real-time typing animations

### 📊 Professional Features
- Complete 50+ Human Design data points
- Composite charts for relationship compatibility
- Return charts (Solar, Saturn, Uranus, Chiron)
- Professional dashboard for practitioners

### ⚙️ Comprehensive Settings
- AI Configuration (depth, focus areas, style)
- Notification preferences
- Data export in multiple formats
- Privacy controls with granular permissions

## 🚢 Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main

### Environment Variables for Production
```
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
OPENAI_API_KEY=your-openai-key
HUMANDESIGN_AI_API_KEY=your-hd-api-key
N8N_WEBHOOK_BASE_URL=your-n8n-instance
WEBHOOK_SECRET=your-webhook-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.railway.app
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main dashboard
│   ├── onboarding/     # User setup flow
│   └── api/            # API routes & webhooks
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── chat/           # Chat interface
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── lib/
│   ├── supabase.ts     # Database configuration
│   ├── types.ts        # TypeScript definitions
│   └── utils.ts        # Utility functions
└── hooks/              # React hooks
```

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- Middleware-based route protection
- Secure webhook endpoints with API key validation

## 🎯 Roadmap

### Phase 2 (Weeks 2-4)
- Advanced chart features (composite, returns)
- Real-time transit system
- Mobile app (React Native)
- Professional practitioner dashboard

### Phase 3 (Months 2-3)
- Community features and forums
- Educational content and learning paths
- Third-party integrations
- Advanced analytics and insights

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ for the Human Design community**
